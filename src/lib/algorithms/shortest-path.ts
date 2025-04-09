import { animate } from 'motion';

import { HTML_IDS, HTML_SELECTORS, secondsToMilliseconds, sleep } from '..';

export class ShortestPath {
  static reset() {
    document.querySelector(HTML_SELECTORS.components.shortestPath)?.remove();
  }

  constructor(private readonly path: INode[]) {
    this.run = this.run.bind(this);
  }

  getNodeCenter = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  drawShortestPath = (): SVGSVGElement => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', HTML_IDS.components.shortestPath);
    svg.setAttribute('width', String(globalThis.innerWidth));
    svg.setAttribute('height', String(globalThis.innerHeight));
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';

    for (const [i, { domNode }] of this.path.entries()) {
      if (i === this.path.length - 1) continue;

      const p1 = this.getNodeCenter(domNode);
      const p2 = this.getNodeCenter(this.path[i + 1].domNode);

      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      const d = [
        `M ${p1.x} ${p1.y}`,
        `L ${p2.x} ${p1.y}`,
        `L ${p2.x} ${p2.y}`,
      ].join(' ');

      path.setAttribute('d', d);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', this.getPathColor(i));

      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', String(length));
      path.setAttribute('stroke-dashoffset', String(length));

      svg.append(path);
    }

    return svg;
  };

  *run(this: this) {
    ShortestPath.reset();

    const newSvg = this.drawShortestPath();

    document.body.append(newSvg);

    const duration = 0.025;

    for (const path of newSvg.querySelectorAll('path')) {
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
    await this.animate(newSvg);
  };

  private getPathColor = (i: number) => {
    const ratio = (i + 1) / this.path.length;
    const endPercent = Math.floor(ratio * 100);

    return `color-mix(in oklch, var(--color-green-600), var(--color-orange-600) ${endPercent}%)`;
  };
}
