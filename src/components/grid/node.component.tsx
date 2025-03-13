import { motion } from 'framer-motion';
import { PureComponent, type RefObject, createRef } from 'react';

import { cn } from '@/lib/utils';

import { NodeType } from './node-type.enum';

interface Props {
  className?: string;
  id?: string;
  isLastColumn: boolean;
  onClick: (node: Node) => NodeType;
  onMouseOver: (node: Node) => NodeType;
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

  private ref: RefObject<HTMLDivElement>;
  readonly xIndex: number;
  readonly yIndex: number;

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

  render() {
    const { className, id, isLastColumn, size, xIndex, yIndex } = this.props;
    const { type, visited } = this.state;

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
                rotate: 0,

                x: -(this.xIndex * 100),
                y: -(this.yIndex * 100),
              }
        }
        whileHover={
          visited
            ? {
                borderStyle: 'solid',
                borderWidth: '1px',
              }
            : {
                borderBottomWidth: '1px',
                borderColor: 'black',
                borderRightWidth: '1px',
                scale: 1.05,
              }
        }
        whileFocus={
          visited
            ? {
                borderStyle: 'solid',
                borderWidth: '1px',
              }
            : {
                borderBottomWidth: '1px',
                borderColor: 'white',
                borderRightWidth: '1px',
                scale: 4.05,
              }
        }
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
          `border-l border-t border-background bg-secondary transition-colors last:border-b data-[type=finish]:bg-orange-600 data-[type=none]:bg-transparent data-[type=start]:bg-green-600 data-[type=wall]:bg-red-600`,
          'data-[type=wall]:bg-gradient-to-br data-[type=wall]:from-red-400 data-[type=wall]:to-orange-400',
          isLastColumn && 'border-r',
          className
        )}
      />
    );
  }
}
