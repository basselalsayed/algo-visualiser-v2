import { type TargetAndTransition, motion } from 'motion/react';
import { PureComponent, type RefObject, createRef } from 'react';

import { cn, getCSSVariable } from '@/lib/utils';

import { NodeType } from './node-type.enum';

interface Props {
  className?: string;
  columnCount: number;
  id?: string;
  isLastColumn: boolean;
  onClick: (node: Node) => NodeType;
  onMouseOver: (node: Node) => NodeType;
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
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.setPastNode = this.setPastNode.bind(this);
    this.setHeuristic = this.setHeuristic.bind(this);
    this.setManhatten = this.setManhatten.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setType = this.setType.bind(this);
    this.setVisited = this.setVisited.bind(this);
  }

  private ref: RefObject<HTMLDivElement | null>;
  readonly xIndex: number;
  readonly yIndex: number;

  get coordinates(): NodeCoordinates {
    return [this.xIndex, this.yIndex];
  }

  private _pastNode?: Node | undefined;
  get pastNode() {
    return this._pastNode;
  }
  setPastNode(value?: Node) {
    this._pastNode = value;
  }

  private _heuristic = Infinity;
  get heuristic() {
    return this._heuristic;
  }
  setHeuristic(value: number) {
    this._heuristic = value;
  }

  private _manhatten = Infinity;
  get manhatten() {
    return this._manhatten;
  }
  setManhatten(value: number) {
    this._manhatten = value;
  }

  private _distance = Infinity;
  get distance() {
    return this._distance;
  }
  setDistance(value: number) {
    this._distance = value;
  }

  get type() {
    return this.state.type;
  }
  setType(type: NodeType) {
    this.setState({ type });
  }

  private _visited: boolean = false;
  get visited() {
    return this._visited;
  }
  setVisited(visited: boolean) {
    this._visited = visited;
    if (this.isWall) {
      this.domNode.toggleAttribute('data-visited-wall', visited);
    } else {
      this.domNode.toggleAttribute('data-visited', visited);
    }
  }

  reset(this: this, resetType: boolean | NodeType[]) {
    this.setPastNode(undefined);
    this.setHeuristic(Infinity);
    this.setManhatten(Infinity);
    this.setDistance(Infinity);
    this.setVisited(false);

    let newType = this.type;

    if (resetType === true) newType = NodeType.none;
    else if (Array.isArray(resetType) && resetType.includes(this.type))
      newType = NodeType.none;

    this.setType(newType);
  }

  get isStart() {
    return this.type === 'start';
  }
  get isEnd() {
    return this.type === 'end';
  }
  get isWall() {
    return this.type === 'wall';
  }
  get domNode(): HTMLDivElement {
    if (!this.ref.current) throw new Error('Error mounting node');

    return this.ref.current;
  }

  private handleClick() {
    const { onClick } = this.props;
    this.setState({ type: onClick(this) });
  }

  private handleMouseOver() {
    const { onMouseOver } = this.props;
    this.setState({ type: onMouseOver(this) });
  }

  private get shadowOffset(): { x: number; y: number } {
    const { columnCount, rowCount } = this.props;

    return {
      x: 0.4 * (1 - 2 * (this.xIndex / columnCount)),
      y: 0.4 * (1 - 2 * (this.yIndex / rowCount)),
    };
  }

  private get hoverFocusStyles(): TargetAndTransition {
    const colorPrimary = getCSSVariable('--primary');

    const { columnCount, rowCount } = this.props;

    const x = -(1 - 2 * (this.xIndex / columnCount));
    const y = -(1 - 2 * (this.yIndex / rowCount));

    return {
      backdropFilter: 'blur(10px)',
      backgroundColor: `hsl(${colorPrimary} / 0.1)`,
      boxShadow: `${this.shadowOffset.x}rem ${this.shadowOffset.y}rem 0.5rem 0.2rem var(--color-primary-foreground)`,
      scale: 1.1,
      transition: {
        duration: 0.01,
        ease: 'easeInOut',
      },
      x,
      y,
      zIndex: 4,
    };
  }

  render() {
    const { className, id, isLastColumn, size, xIndex, yIndex } = this.props;
    const { type } = this.state;

    return (
      <motion.div
        id={id}
        tabIndex={-1}
        ref={this.ref}
        initial={{
          x: -(xIndex * 100),
          y: -(yIndex * 100),
        }}
        animate={{
          transition: {
            duration: 0.1 * (this.xIndex + this.yIndex),
            ease: 'easeInOut',
            type: 'spring',
          },
          x: 0,
          y: 0,
        }}
        whileHover={this.hoverFocusStyles}
        whileFocus={this.hoverFocusStyles}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
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
          'transition-node bg-radial from-transparent to-transparent duration-700 [will-change:transform,backdrop-filter,--border-width,border-width]',
          // border
          'border-background border-t-(length:--border-width) border-l-(length:--border-width) [--border-width:1px] last:border-b-(length:--border-width)',
          isLastColumn && 'border-r-(length:--border-width)',
          // visited state
          'data-visited:animate-node-visited data-visited:z-2 data-visited:scale-100 data-visited:[--border-width:0px]',
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
