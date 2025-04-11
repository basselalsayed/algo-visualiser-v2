import { animate } from 'motion';

import { toSnake } from '@/data';

import {
  type AlgoName,
  HTML_SELECTORS,
  secondsToMilliseconds,
  sleep,
} from '..';

export class ShortestPath {
  private readonly pathMap: Map<AlgoName, INode[]>;
  addPath = (name: AlgoName, path: INode[]) => {
    this.pathMap.set(name, path);
  };

  static reset() {
    document
      .querySelector(HTML_SELECTORS.components.shortestPathSvg)
      ?.replaceChildren();

    document
      .querySelector(HTML_SELECTORS.components.shortestPathTooltip)
      ?.replaceChildren();
  }

  constructor(name: AlgoName, path: INode[]) {
    this.pathMap = new Map<AlgoName, INode[]>();
    this.pathMap.set(name, path);

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

      const p1 = this.getNodeCenter(domNode);
      const p2 = this.getNodeCenter(shortestPath[i + 1].domNode);

      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      const d = [
        `M ${p1.x} ${p1.y}`,
        `L ${p2.x} ${p1.y}`,
        `L ${p2.x} ${p2.y}`,
      ].join(' ');

      path.setAttribute('id', toSnake(name));
      path.setAttribute('d', d);
      path.setAttribute('stroke-width', 'var(--shortest-path-width)');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', this.getPathColor(i, totalPathLength, name));

      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', String(length));
      path.setAttribute('stroke-dashoffset', String(length));

      this.svg.append(path);
    }
  };

  *run(this: this) {
    this.drawShortestPath();

    const duration = 0.025;
    const [name] = this.mostRecentPath;

    for (const path of this.svg.querySelectorAll<SVGPathElement>(
      `path#${toSnake(name)}`
    )) {
      animate(
        path,
        {
          strokeDashoffset: 0,
        },
        {
          duration,
          ease: 'easeInOut',
        }
      );

      yield sleep(secondsToMilliseconds(duration));
    }
  }

  private colors = Object.fromEntries(
    ['ASE', 'ASM', 'BFS', 'DFS', 'DIJ'].map((name) => [
      name,
      ['var(--shortest-path-start)', `var(--shortest-path-end-${name})`],
    ])
  );

  private getPathColor = (i: number, length: number, name: AlgoName) => {
    const ratio = (i + 1) / length;
    const endPercent = Math.floor(ratio * 100);

    const [startColor, endColor] = this.colors[name];

    return `color-mix(in oklch, ${startColor}, ${endColor} ${endPercent}%)`;
  };
}
