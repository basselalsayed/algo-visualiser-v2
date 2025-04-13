import { isPlainObject, mapValues } from 'lodash-es';

export const HTML_IDS = {
  buttons: {
    algoFormTrigger: 'deskAlgoForm',
    maze: 'mazeBtn',
    reset: 'resetBtn',
    run: 'runBtn',
    search: 'searchBtn',
    settingsTrigger: 'deskSettings',
    sheetTrigger: 'mobileSettings',
  },
  components: {
    grid: 'nodeGrid',
    shortestPathContainer: 'shortestPathContainer',
    shortestPathSvg: 'shortestPathSvg',
    shortestPathTooltip: 'shortestPathTooltip',
  },
  tutorial: {
    node: 'exampleNode',
  },
} as const;

interface IID {
  [k: string]: string | IID;
}

type Selectorify<T> = {
  [K in keyof T]: T[K] extends string ? `#${T[K]}` : Selectorify<T[K]>;
};

const mapIdsToSelectors = <T extends IID>(obj: T): Selectorify<T> =>
  mapValues(obj, (val) =>
    isPlainObject(val) ? mapIdsToSelectors(val as IID) : `#${val as string}`
  ) as Selectorify<T>;

export const HTML_SELECTORS = mapIdsToSelectors(HTML_IDS);
