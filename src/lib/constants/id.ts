export const HTML_IDS = {
  buttons: {
    algoFormTrigger: 'deskAlgoForm',
    maze: 'mazeBtn',
    reset: 'resetBtn',
    run: 'runBtn',
    search: 'searchBtn',
    settingsTrigger: 'deskSettings',
  },
  components: {
    grid: 'nodeGrid',
  },
  tutorial: {
    node: 'exampleNode',
  },
};

export const HTML_SELECTORS = Object.fromEntries(
  Object.entries(HTML_IDS).map(([category, ids]) => [
    category,
    Object.fromEntries(
      (Object.keys(ids) as (keyof typeof ids)[]).map((key) => [
        key,
        `#${ids[key]}`,
      ])
    ),
  ])
) as typeof HTML_IDS;
