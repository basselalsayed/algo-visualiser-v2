import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import { t } from 'i18next';
import { isEqual } from 'lodash-es';
import { mix } from 'motion';
import { match } from 'ts-pattern';

import { type AnimationDirection } from '@/@types';
import { type Duration, HTML_SELECTORS, getCSSVariable, noOp } from '@/lib';

import { ALGO_NAMES, type AlgoName } from './types';

interface Coordinates {
  x: number;
  y: number;
}

class _ShortestPath {
  addPath = (name: AlgoName, path: INode[]) => {
    this.pathMap.set(name, path);
  };

  reverse = async (name: AlgoName) => {
    const animations = _ShortestPath
      .getGroupPaths(name)
      .reverse()
      .map((el, i) => {
        const animation = el.animate(
          [_ShortestPath.getSVGTransition(el, 'out')],
          {
            delay: i * this.animationDuration.inMillis,
            duration: this.animationDuration.inMillis,
            easing: 'linear',
            fill: 'forwards',
          }
        );

        animation.onfinish = () => {
          if (el.dataset.tooltipTarget) {
            _ShortestPath.animateTooltip(name, 'out')?.finished.then(() => {
              _ShortestPath.getTooltip(name)?.remove();
            }, noOp);
          }
        };

        return animation;
      });

    await Promise.all(animations.map((a) => a.finished));

    _ShortestPath.getGroup(name)?.remove();
    this.pathMap.delete(name);
    this.cleanupMap.get(name)?.();
    this.cleanupMap.delete(name);
  };

  *run(this: this, animationSpeed: Duration) {
    this.drawShortestPath();
    this._animationSpeed = animationSpeed;

    const [name] = this.mostRecentPath;

    for (const el of _ShortestPath.getGroupPaths(name)) {
      const animation = el.animate([_ShortestPath.getSVGTransition(el, 'in')], {
        duration: this.animationDuration.inMillis,
        easing: 'linear',
        fill: 'forwards',
      });

      animation.onfinish = () => {
        if (el.dataset.tooltipTarget) {
          _ShortestPath.animateTooltip(name, 'in');
        }
      };

      yield animation.finished;
    }
  }

  reset = () =>
    Promise.all([...this.pathMap.keys()].map((name) => this.reverse(name)));

  constructor() {
    this.pathMap = new Map<AlgoName, INode[]>();
    this.cleanupMap = new Map<AlgoName, VoidFunction>();

    this.run = this.run.bind(this);
  }

  private static get svg() {
    return document.querySelector<SVGSVGElement>(
      HTML_SELECTORS.components.shortestPathSvg
    )!;
  }
  private static get tooltipContainer() {
    return document.querySelector<HTMLDivElement>(
      HTML_SELECTORS.components.shortestPathTooltip
    )!;
  }

  private static get nodeSize() {
    return Number(getCSSVariable('--node-size'));
  }

  private static getGroupID = (name: string) => `g-${name}`;

  private static getGroupSelector = (name: string) =>
    `#${this.getGroupID(name)}`;

  private static getGroup = (name: AlgoName) =>
    this.svg?.querySelector<SVGGElement>(this.getGroupSelector(name));

  private static getGroupPaths = (name: AlgoName) => [
    ...(_ShortestPath
      .getGroup(name)
      ?.querySelectorAll<SVGPathElement | SVGCircleElement>('path, circle') ??
      []),
  ];

  private static getTooltipID = (name: string) => `tooltip-${name}`;

  private static getTooltipSelector = (name: string) =>
    `#${this.getTooltipID(name)}`;

  private static getTooltip = (name: AlgoName) =>
    this.tooltipContainer?.querySelector<HTMLDivElement>(
      this.getTooltipSelector(name)
    );

  private static getNodeCenter = (el: Element): Coordinates => {
    const rect = el.getBoundingClientRect();

    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  private static createPathElement(d: string, color: string) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('d', d);
    path.setAttribute('stroke-width', 'var(--shortest-path-width)');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);

    const length = String(path.getTotalLength());
    path.setAttribute('stroke-dasharray', length);
    path.setAttribute('stroke-dashoffset', length);

    return path;
  }

  private static createCircleElement(cx: string, cy: string, color: string) {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', '0');
    circle.setAttribute('fill', color);

    return circle;
  }

  private static getSVGTransition(
    el: SVGElement,
    dir: AnimationDirection
  ): Keyframe {
    const [strokeDashoffset, r] =
      dir === 'in'
        ? [0, _ShortestPath.nodeSize / 20]
        : [(el as SVGPathElement).getTotalLength(), 0];

    return match(el.tagName.toLowerCase())
      .returnType<Keyframe>()
      .with('path', () => ({ strokeDashoffset }))
      .with('circle', () => ({ r }))
      .otherwise(() => ({}));
  }

  private static animateTooltip(name: AlgoName, direction: 'in' | 'out') {
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

  private readonly pathMap: Map<AlgoName, INode[]>;
  private readonly cleanupMap: Map<AlgoName, VoidFunction>;
  private readonly colors = Object.fromEntries(
    ['dijkstra', 'aStarE', 'aStarM', 'dfs', 'bfs'].map((name) => [
      name,
      ['--shortest-path-start', `--shortest-path-end-${name}`],
    ])
  );
  private _animationSpeed: Duration | undefined;
  private _pathSegments = 6;

  private get animationDuration() {
    return this._animationSpeed!.divide(this._pathSegments, {
      max: 300,
      min: 10,
    });
  }

  private get mostRecentPath() {
    return [...this.pathMap.entries()].at(-1)!;
  }

  private addCleanup = (name: AlgoName, cleanup: VoidFunction) => {
    this.cleanupMap.set(name, cleanup);
  };

  private drawShortestPath = () => {
    const [name, shortestPath] = this.mostRecentPath;
    const totalPathLength = shortestPath.length;

    this._pathSegments = Math.floor(_ShortestPath.nodeSize / 5);

    const groupElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    groupElement.id = _ShortestPath.getGroupID(name);

    let prevDir: Coordinates | undefined;

    for (const [i, { domNode }] of shortestPath.entries()) {
      if (i === totalPathLength - 1) continue;

      const p1 = _ShortestPath.getNodeCenter(domNode!);
      const p2 = _ShortestPath.getNodeCenter(shortestPath[i + 1].domNode!);

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dir = { x: Math.sign(dx), y: Math.sign(dy) };

      if (prevDir && !isEqual(dir, prevDir)) {
        const joint = _ShortestPath.createCircleElement(
          String(p1.x),
          String(p1.y),
          this.getPathColor(i, totalPathLength, name)
        );

        groupElement.append(joint);
      }

      prevDir = dir;

      const mixer = mix(p1, p2);

      let start = p1;

      for (let s = 1; s <= this._pathSegments; s++) {
        const mixRatio = s / this._pathSegments;
        const end = mixer(mixRatio);

        const path = _ShortestPath.createPathElement(
          `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
          this.getPathColor(i + mixRatio, totalPathLength, name)
        );

        if (this.isTooltipTarget(i, totalPathLength, name, s)) {
          path.dataset.tooltipTarget = 'true';
          this.createToolTip(name, path);
        }

        groupElement.append(path);

        start = { ...end };
      }
    }
    _ShortestPath.svg.append(groupElement);
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
      'text-base',
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

    _ShortestPath.tooltipContainer.append(tooltip);

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
      }, noOp);
    });

    this.addCleanup(name, cleanup);

    return tooltip;
  };

  private getPathColor = (i: number, length: number, name: AlgoName) => {
    const ratio = (i + 1) / length;
    const [startColor, endColor] = this.colors[name].map((name) =>
      getCSSVariable(name)
    );

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
}

export const ShortestPath = new _ShortestPath();
