import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import { t } from 'i18next';
import { animate, mix } from 'motion';

import { useSettings } from '@/hooks';

import {
  ALGO_NAMES,
  type AlgoName,
  type Duration,
  HTML_SELECTORS,
  getCSSVariable,
} from '..';

class _ShortestPath {
  addPath = (name: AlgoName, path: INode[]) => {
    this.pathMap.set(name, path);
  };

  reverse = async (name: AlgoName) => {
    const animations = this.getGroupPaths(name)
      .reverse()
      .map((path, i) =>
        animate(
          path,
          { pathLength: 0 },
          {
            delay: i * this.animationDuration.inSeconds,
            duration: this.animationDuration.inSeconds,
            onComplete: async () => {
              if (path.dataset.tooltipTarget) {
                await this.animateTooltip(name, 'out')?.finished;

                this.getTooltip(name)?.remove();
              }
            },
          }
        )
      );

    await Promise.all(animations.map((a) => a.finished));

    this.getGroup(name)?.remove();
    this.pathMap.delete(name);
  };

  *run(this: this, animationSpeed: Duration) {
    this.drawShortestPath();
    this._animationSpeed = animationSpeed;

    const [name] = this.mostRecentPath;

    for (const path of this.getGroupPaths(name)) {
      yield animate(
        path,
        {
          pathLength: 1,
        },
        {
          duration: this.animationDuration.inSeconds,
          ease: 'linear',
          onComplete: () => {
            if (path.dataset.tooltipTarget) {
              this.animateTooltip(name, 'in');
            }
          },
        }
      );
    }
  }

  reset = () => {
    const { shortestPathSvg, shortestPathTooltip } = HTML_SELECTORS.components;

    document.querySelector(shortestPathSvg)?.replaceChildren();
    document.querySelector(shortestPathTooltip)?.replaceChildren();

    this.pathMap.clear();

    for (const cleanup of this.cleanupArray) cleanup();
  };

  constructor() {
    this.pathMap = new Map<AlgoName, INode[]>();
    this.cleanupArray = [];

    this.run = this.run.bind(this);
  }

  private static getGroupID = (name: string) => `g-${name}`;
  private static getTooltipID = (name: string) => `tooltip-${name}`;
  private static getGroupSelector = (name: string) =>
    `#${_ShortestPath.getGroupID(name)}`;
  private static getTooltipSelector = (name: string) =>
    `#${_ShortestPath.getTooltipID(name)}`;

  private readonly pathMap: Map<AlgoName, INode[]>;
  private readonly cleanupArray: VoidFunction[];
  private readonly colors = Object.fromEntries(
    ['dijkstra', 'aStarE', 'aStarM', 'dfs', 'bfs'].map((name) => [
      name,
      ['--shortest-path-start', `--shortest-path-end-${name}`],
    ])
  );
  private _animationSpeed: Duration | undefined;
  private _pathSegments: number = 6;

  private get animationDuration() {
    return this._animationSpeed!.divide(this._pathSegments, {
      max: 300,
      min: 10,
    });
  }

  private get svg() {
    return document.querySelector<SVGSVGElement>(
      HTML_SELECTORS.components.shortestPathSvg
    )!;
  }
  private get tooltipContainer() {
    return document.querySelector<HTMLDivElement>(
      HTML_SELECTORS.components.shortestPathTooltip
    )!;
  }

  private get mostRecentPath() {
    return [...this.pathMap.entries()].at(-1)!;
  }

  private addCleanup = (cleanup: VoidFunction) => {
    this.cleanupArray.push(cleanup);
  };

  private getNodeCenter = (el: Element) => {
    const rect = el.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  private getGroup = (name: AlgoName) =>
    this.svg?.querySelector<SVGGElement>(_ShortestPath.getGroupSelector(name));

  private getGroupPaths = (name: AlgoName) => [
    ...(this.getGroup(name)?.querySelectorAll<SVGPathElement>('path') ?? []),
  ];

  private getTooltip = (name: AlgoName) =>
    this.tooltipContainer?.querySelector<HTMLDivElement>(
      _ShortestPath.getTooltipSelector(name)
    );

  private createPathElement(
    d: string,
    name: AlgoName,
    totalPathLength: number,
    i: number
  ) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('d', d);
    path.setAttribute('stroke-width', 'var(--shortest-path-width)');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', this.getPathColor(i, totalPathLength, name));

    const length = String(path.getTotalLength());
    path.setAttribute('stroke-dasharray', length);
    path.setAttribute('stroke-dashoffset', length);

    return path;
  }

  private drawShortestPath = () => {
    const [name, shortestPath] = this.mostRecentPath;
    const totalPathLength = shortestPath.length;
    const { nodeSize } = useSettings.getState();
    this._pathSegments = Math.floor(nodeSize / 5);

    const groupElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    groupElement.id = _ShortestPath.getGroupID(name);

    for (const [i, { domNode }] of shortestPath.entries()) {
      if (i === totalPathLength - 1) continue;

      const p1 = this.getNodeCenter(domNode);
      const p2 = this.getNodeCenter(shortestPath[i + 1].domNode);

      const mixer = mix(p1, p2);

      let start = p1;

      for (let s = 1; s <= this._pathSegments; s++) {
        const mixRatio = s / this._pathSegments;
        const end = mixer(mixRatio);

        const path = this.createPathElement(
          `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
          name,
          totalPathLength,
          i + mixRatio
        );

        if (this.isTooltipTarget(i, totalPathLength, name, s)) {
          path.dataset.tooltipTarget = 'true';
          this.createToolTip(name, path);
        }

        groupElement.append(path);

        start = { ...end };
      }
    }
    this.svg.append(groupElement);
  };

  private createToolTip = (name: AlgoName, path: SVGPathElement) => {
    const tooltip = document.createElement('div');
    tooltip.id = _ShortestPath.getTooltipID(name);
    tooltip.classList.add(
      'bg_grad_accent--outline--text',
      'absolute',
      'p-2',
      'py-4',
      'rounded-md',
      'text-sm',
      'z-2',
      'pointer-events-none'
    );
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale(0)';

    const tKey = `algoInfo:${name}.name` as const;
    tooltip.textContent = t(tKey);
    tooltip.dataset.tKey = tKey;

    const arrowEl = document.createElement('div');

    arrowEl.classList.add(
      'bg_grad_accent--outline--text',
      'absolute',
      'size-2',
      'rotate-45',
      'z-[-1]',
      'block'
    );

    tooltip.append(arrowEl);

    this.tooltipContainer.append(tooltip);

    const cleanup = autoUpdate(path, tooltip, () => {
      computePosition(path, tooltip, {
        middleware: [
          offset(6),
          flip(),
          shift({ padding: 5 }),
          arrow({ element: arrowEl, padding: 5 }),
        ],
        placement: 'top',
      }).then(({ middlewareData, placement, x, y }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {
          x: undefined,
          y: undefined,
        };

        const staticSide = {
          bottom: 'top',
          left: 'right',
          right: 'left',
          top: 'bottom',
        }[placement.split('-')[0]];

        Object.assign(arrowEl.style, {
          bottom: '',
          left: arrowX == undefined ? '' : `${arrowX}px`,
          right: '',
          top: arrowY == undefined ? '' : `${arrowY}px`,
          ...(staticSide ? { [staticSide]: '-4px' } : {}),
        });
      });
    });

    this.addCleanup(cleanup);

    return tooltip;
  };

  private getPathColor = (i: number, length: number, name: AlgoName) => {
    const ratio = (i + 1) / length;
    const [startColor, endColor] = this.colors[name].map(getCSSVariable);

    return mix(startColor, endColor)(ratio);
  };

  private isTooltipTarget = (
    i: number,
    totalPathLength: number,
    name: AlgoName,
    s: number
  ) => {
    const slotIndex = ALGO_NAMES.indexOf(name) + 1;

    return (
      i ===
        Math.floor((slotIndex * totalPathLength) / (ALGO_NAMES.length * 1.5)) &&
      s === this._pathSegments
    );
  };

  private animateTooltip(name: AlgoName, direction: 'in' | 'out') {
    const keyframes = [
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
    ];

    return this.getTooltip(name)?.animate(
      direction === 'in' ? keyframes : keyframes.reverse(),
      {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );
  }
}

export const ShortestPath = new _ShortestPath();
