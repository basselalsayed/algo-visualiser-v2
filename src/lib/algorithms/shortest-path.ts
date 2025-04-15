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


import {
  type AlgoName,
  HTML_SELECTORS,
  secondsToMilliseconds,
  sleep,
} from '..';

class _ShortestPath {
  private readonly pathMap: Map<AlgoName, INode[]>;
  addPath = (name: AlgoName, path: INode[]) => {
    this.pathMap.set(name, path);
  };

  private readonly cleanupArray: VoidFunction[];
  addCleanup = (cleanup: VoidFunction) => {
    this.cleanupArray.push(cleanup);
  };

  reset = () => {
    document
      .querySelector(HTML_SELECTORS.components.shortestPathSvg)
      ?.replaceChildren();

    document
      .querySelector(HTML_SELECTORS.components.shortestPathTooltip)
      ?.replaceChildren();

    this.pathMap.clear();
    for (const cleanup of this.cleanupArray) cleanup();
  };

  constructor() {
    this.pathMap = new Map<AlgoName, INode[]>();
    this.cleanupArray = [];

    this.run = this.run.bind(this);
  }

  getNodeCenter = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  get svg() {
    return document.querySelector<SVGSVGElement>(
      HTML_SELECTORS.components.shortestPathSvg
    )!;
  }
  get tooltipContainer() {
    return document.querySelector<HTMLDivElement>(
      HTML_SELECTORS.components.shortestPathTooltip
    )!;
  }

  get mostRecentPath() {
    return [...this.pathMap.entries()].at(-1)!;
  }

  drawShortestPath = () => {
    const [name, shortestPath] = this.mostRecentPath;

    const totalPathLength = shortestPath.length;
    for (const [i, { domNode }] of shortestPath.entries()) {
      if (i === totalPathLength - 1) continue;

      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      const p1 = this.getNodeCenter(domNode);
      const p2 = this.getNodeCenter(shortestPath[i + 1].domNode);

      const d = [
        `M ${p1.x} ${p1.y}`,
        `L ${p2.x} ${p1.y}`,
        `L ${p2.x} ${p2.y}`,
      ].join(' ');

      path.setAttribute('id', name);
      path.setAttribute('d', d);
      path.setAttribute('stroke-width', 'var(--shortest-path-width)');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', this.getPathColor(i, totalPathLength, name));

      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', String(length));
      path.setAttribute('stroke-dashoffset', String(length));

      this.svg.append(path);

      if (i === Math.floor(totalPathLength / 4)) {
        path.dataset.tooltipTarget = 'true';
      }
    }
  };

  *run(this: this) {
    this.drawShortestPath();

    const duration = 0.025;
    const [name] = this.mostRecentPath;

    for (const path of this.svg.querySelectorAll<SVGPathElement>(
      `path#${name}`
    )) {
      animate(
        path,
        {
          strokeDashoffset: 0,
        },
        {
          duration,
          ease: 'easeInOut',
          onComplete: () => {
            if (path.dataset.tooltipTarget) {
              this.createToolTip(name, path);
            }
          },
        }
      );

      yield sleep(secondsToMilliseconds(duration));
    }
  }

  createToolTip = (name: AlgoName, path: SVGPathElement) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add(
      'bg_grad_accent--outline--text',
      'absolute',
      'p-2',
      'py-4',
      'rounded-md',
      'text-sm',
      'z-[9999]',
      'pointer-events-none'
    );

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
  };

  private colors = Object.fromEntries(
    ['dijkstra', 'aStarE', 'aStarM', 'dfs', 'bfs'].map((name) => [
      name,
      ['--shortest-path-start', `--shortest-path-end-${name}`],
    ])
  );

  private getPathColor = (i: number, length: number, name: AlgoName) => {
    const ratio = (i + 1) / length;
    const [startColor, endColor] = this.colors[name].map(getCSSVariable);

    return mix(startColor, endColor)(ratio);
  };
}

export const ShortestPath = new _ShortestPath();
