import { createRef, RefObject, PureComponent } from 'react';
import { NodeType } from './node-type.enum';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  size: number;
  xIndex: number;
  yIndex: number;
  isLastColumn: boolean;
  onClick: (node: Node) => NodeType;
  onMouseOver: (node: Node) => NodeType;
}

interface State {
  type: NodeType;
  visited: boolean;
}

export class Node extends PureComponent<Props, State> {
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
  }

  xIndex: number;
  yIndex: number;
  pastNode?: Node;
  private _visited = false;
  public get visited() {
    return this._visited;
  }
  public set visited(value) {
    this._visited = value;
    this.setState({ visited: value });
  }

  heuristic = Infinity;
  manhatten = Infinity;
  distance = Infinity;
  ref: RefObject<HTMLDivElement>;

  reset(this: this) {
    this.pastNode = undefined;
    this.visited = false;
    this.heuristic = Infinity;
    this.manhatten = Infinity;
    this.distance = Infinity;
    this.setState({ type: NodeType.none });
  }

  get type() {
    return this.state.type;
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
    if (!this.ref.current) throw Error('Error mounting node');

    return this.ref.current;
  }

  handleClick() {
    const { onClick } = this.props;
    this.setState({ type: onClick(this) });
  }

  handleMouseOver() {
    const { onMouseOver } = this.props;
    this.setState({ type: onMouseOver(this) });
  }

  render() {
    const { size, xIndex, yIndex, isLastColumn } = this.props;
    const { type } = this.state;

    return (
      <motion.div
        initial={
          this.state.visited
            ? {
                borderWidth: '0px',
              }
            : {
                rotate: 0,
                borderStyle: 'solid',
                borderWidth: '1px 0px 0px 1px',
              }
        }
        whileHover={
          this.state.visited
            ? {
                borderStyle: 'solid',
                borderWidth: '1px',
              }
            : {
                rotate: 90,
                scale: 1.8,
                borderBottomWidth: '1px',
                borderRightWidth: '1px',
              }
        }
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
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
          `bg-secondary border-background border-t last:border-b border-l data-[type=none]:bg-blue-600 data-[type=wall]:bg-red-600 data-[type=start]:bg-green-600 data-[type=finish]:bg-orange-600 transition-colors `,
          isLastColumn && 'border-r'
        )}
      />
    );
  }
}
