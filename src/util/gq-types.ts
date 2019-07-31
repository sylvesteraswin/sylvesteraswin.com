export interface GQData<T = any> {
  data: T;
}

export interface GQNode<T = any> {
  node: T;
}

export interface GQEdges<T = any> {
  edges: [GQNode<T>];
}

export interface GQGroupData<T> extends GQEdges<T> {
  name: string;
}

export interface GQGroup<T> {
  group: Array<GQGroupData<T>>;
}
