/* eslint-disable @typescript-eslint/member-ordering */
import { clamp, shuffle } from 'lodash-es';
import { PureComponent, type RefObject, createRef } from 'react';

import { type AnimationDirection } from '@/@types';
import { Duration, NodeType, cn, getCSSVariable, noOp } from '@/lib';

interface Props {
  className?: string;
  columnCount: number;
  id?: string;
  isLastColumn: boolean;
  onClick: (node: Node) => NodeType;
  rowCount: number;
  size: number;
  xIndex: number;
  yIndex: number;
}

interface State {
  type: NodeType;
}

export class Node extends PureComponent<Props, State> implements INode {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: NodeType.none,
    };

    this.xIndex = props.xIndex;
    this.yIndex = props.yIndex;

    this.ref = createRef();
    this.handleClick = this.handleClick.bind(this);
    this.setPastNode = this.setPastNode.bind(this);
    this.setTotalEstimatedCost = this.setTotalEstimatedCost.bind(this);
    this.setEstimatedCostToGoal = this.setEstimatedCostToGoal.bind(this);
    this.setCostFromStart = this.setCostFromStart.bind(this);
    this.setType = this.setType.bind(this);
    this.setVisited = this.setVisited.bind(this);
  }
  observer: MutationObserver | undefined;

  componentDidMount(): void {
    this.animatePresence('in').catch(noOp);

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-type'
        ) {
          const { type } = (mutation.target as HTMLDivElement).dataset;
          if (
            type !== this.type &&
            Object.values(NodeType).includes(type as NodeType)
          ) {
            this.setType(type as NodeType);
          }
        }
      }
    });

    this.observer.observe(this.domNode!, {
      attributeFilter: ['data-type'],
    });
  }

  componentWillUnmount(): void {
    this.observer?.disconnect();
  }

  animatePresence(this: this, direction: AnimationDirection) {
    const {
      domNode,
      props: { size },
    } = this;

    const delay = Duration.randomMillis({ max: 1000, min: 400 }).inMillis;
    const duration = clamp(size * 15, 200, 600);

    const sides = shuffle([
      'borderLeftColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
    ]);

    const animations = [
      ...sides.map((side, index) =>
        domNode!.animate(
          [
            {
              [side]:
                direction === 'in' ? 'var(--color-background)' : 'transparent',
            },
          ],
          {
            delay: delay + index * Math.random() * 100,
            duration,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        )
      ),
      direction === 'out' &&
        domNode!.animate(
          [
            {
              opacity: 0,
            },
          ],
          {
            delay,
            duration,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        ),
    ].filter(Boolean);

    return Promise.all(animations.map((a) => a.finished));
  }

  private ref: RefObject<HTMLDivElement | null>;
  readonly xIndex: number;
  readonly yIndex: number;

  get coordinates(): NodeCoordinates {
    return [this.xIndex, this.yIndex];
  }

  private _pastNode?: INode | undefined;
  get pastNode() {
    return this._pastNode;
  }
  setPastNode(value?: INode) {
    this._pastNode = value;
  }

  private _totalEstimatedCost = Infinity;
  get totalEstimatedCost() {
    return this._totalEstimatedCost;
  }
  setTotalEstimatedCost(value: number) {
    this._totalEstimatedCost = value;
  }

  private _estimatedCostToGoal = Infinity;
  get estimatedCostToGoal() {
    return this._estimatedCostToGoal;
  }
  setEstimatedCostToGoal(value: number) {
    this._estimatedCostToGoal = value;
  }

  private _costFromStart = Infinity;
  get costFromStart() {
    return this._costFromStart;
  }
  setCostFromStart(value: number) {
    this._costFromStart = value;
  }

  get type() {
    return this.state.type;
  }
  setType(type: NodeType) {
    this.setState({ type });
  }

  private _visited = false;
  get visited() {
    return this._visited;
  }
  setVisited(visited: boolean) {
    this._visited = visited;
    this.domNode?.toggleAttribute(
      this.isWall ? 'data-visited-wall' : 'data-visited',
      visited
    );
  }

  reset(this: this, resetType: boolean | NodeType[]) {
    this.setPastNode(undefined);
    this.setTotalEstimatedCost(Infinity);
    this.setEstimatedCostToGoal(Infinity);
    this.setCostFromStart(Infinity);
    this.setVisited(false);

    let newType = this.type;

    if (resetType === true) newType = NodeType.none;
    else if (Array.isArray(resetType) && resetType.includes(this.type))
      newType = NodeType.none;

    this.setType(newType);
  }

  get isStart() {
    return this.type === NodeType.start;
  }
  get isEnd() {
    return this.type === NodeType.end;
  }
  get isWall() {
    return this.type === NodeType.wall;
  }
  get isNone() {
    return this.type === NodeType.none;
  }
  get domNode() {
    return this.ref.current ?? undefined;
  }

  private handleClick() {
    const { onClick } = this.props;
    this.setState({ type: onClick(this) });
  }

  private animateFocusHover(this: this, direction: AnimationDirection) {
    const {
      domNode,
      isEnd,
      isStart,
      props: { columnCount, rowCount },
      xIndex,
      yIndex,
    } = this;

    const isIn = direction === 'in';

    const colorPrimary = getCSSVariable('--primary');

    const shadowOffset = {
      x: 0.4 * (1 - 2 * (xIndex / columnCount)),
      y: 0.4 * (1 - 2 * (yIndex / rowCount)),
    };

    const position = isIn
      ? {
          x: -(1 - 2 * (xIndex / columnCount)),
          y: -(1 - 2 * (yIndex / rowCount)),
        }
      : { x: 0, y: 0 };

    const boxShadow = isIn
      ? `${shadowOffset.x}rem ${shadowOffset.y}rem 0.5rem 0.2rem var(--color-primary-foreground)`
      : 'none';

    const scale = isIn ? 1.1 : 1;

    const initialZ = isStart || isEnd ? 2 : 0;
    const zIndex = isIn ? 4 : initialZ;

    const backdropFilter = isIn ? 'blur(10px)' : 'none';
    const backgroundColor = isIn ? `hsl(${colorPrimary} / 0.1)` : 'initial';

    domNode!.animate(
      [
        {
          backdropFilter,
          backgroundColor,
          boxShadow,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          zIndex,
        },
      ],
      {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );
  }

  render() {
    const { className, id, isLastColumn, size, xIndex, yIndex } = this.props;
    const { type } = this.state;

    return (
      <div
        id={id}
        tabIndex={-1}
        ref={this.ref}
        onPointerEnter={() => this.animateFocusHover('in')}
        onPointerLeave={() => this.animateFocusHover('out')}
        onFocus={() => this.animateFocusHover('in')}
        onBlur={() => this.animateFocusHover('out')}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onClick={this.handleClick}
        style={{
          height: size,
          width: size,
          zIndex: this.isStart || this.isEnd ? 2 : undefined,
        }}
        data-type={type}
        data-x-index={xIndex}
        data-y-index={yIndex}
        className={cn(
          // general
          'bg-radial from-transparent to-transparent transition-node [will-change:transform,backdrop-filter,--border-width,border-width]',
          // border
          'border-t-(length:--border-width) border-l-(length:--border-width) border-transparent [--border-width:1px] last:border-b-(length:--border-width)',
          isLastColumn && 'border-r-(length:--border-width)',
          // visited state
          'data-visited:z-2 data-visited:scale-100 data-visited:animate-node-visited data-visited:[--border-width:0px]',
          'data-visited-wall:animate-node-visited-wall',
          // type colours
          'data-[type=end]:from-orange-600 data-[type=end]:to-red-600',
          'data-[type=start]:from-grad-node-start-1 data-[type=start]:to-grad-node-start-2',
          'data-[type=wall]:from-grad-node-wall-1 data-[type=wall]:to-grad-node-wall-2',
          className
        )}
      />
    );
  }
}
