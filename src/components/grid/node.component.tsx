import { type TargetAndTransition, motion } from 'motion/react';
import { PureComponent, type RefObject, createRef } from 'react';

import { cn } from '@/lib/utils';

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
  visited: boolean;
}

export class Node extends PureComponent<Props, State> implements INode {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: NodeType.none,
      visited: false,
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

  get visited() {
    return this.state.visited;
  }
  setVisited(visited: boolean) {
    this.setState({ visited });
  }

  reset(this: this, resetType: boolean | NodeType[]) {
    this.setPastNode(undefined);
    this.setHeuristic(Infinity);
    this.setManhatten(Infinity);
    this.setDistance(Infinity);

    let newType = this.type;

    if (resetType === true) newType = NodeType.none;
    else if (Array.isArray(resetType) && resetType.includes(this.type))
      newType = NodeType.none;

    this.setState({ type: newType, visited: false });
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
    const colorPrimary = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary');

    const { visited } = this.state;

    return visited
      ? {
          borderWidth: '1px',
          transition: {
            duration: 0.01,
            ease: 'easeInOut',
          },
        }
      : {
          backdropFilter: 'blur(10px)',
          backgroundColor: `hsl(${colorPrimary} / 0.1)`,
          borderWidth: '1px',
          boxShadow: `${this.shadowOffset.x}rem ${this.shadowOffset.y}rem 0.5rem 0.2rem var(--color-primary-foreground)`,
          scale: 1.1,
          transition: {
            duration: 0.1,
            ease: 'easeInOut',
          },
          zIndex: 9999,
        };
  }

  render() {
    const { className, id, isLastColumn, size, xIndex, yIndex } = this.props;
    const { type } = this.state;

    return (
      <motion.div
        id={id}
        tabIndex={-1}
        initial={
          this.state.visited
            ? {
                borderWidth: '0px',
              }
            : {
                borderStyle: 'solid',
                x: -(this.xIndex * 100),
                y: -(this.yIndex * 100),
              }
        }
        whileHover={this.hoverFocusStyles}
        whileFocus={this.hoverFocusStyles}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.1 * (this.xIndex + this.yIndex),
          ease: 'easeInOut',
          type: 'spring',
        }}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        data-type={type}
        data-x-index={xIndex}
        data-y-index={yIndex}
        ref={this.ref}
        style={{
          height: size,
          width: size,
        }}
        className={cn(
          'border-background border-t border-l bg-radial transition-colors last:border-b',
          // 'data-[type=none]:bg-transparent',
          'from-transparent to-transparent',
          'data-[type=end]:from-orange-600 data-[type=end]:to-red-600',
          'data-[type=start]:from-green-600 data-[type=start]:to-cyan-600',
          'data-[type=wall]:from-grad-node-wall-1 data-[type=wall]:to-grad-node-wall-2',
          isLastColumn && 'border-r',
          className
        )}
      />
    );
  }
}
