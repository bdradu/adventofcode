import fs from 'fs';
import path from 'path';

export const problem1 = () => {
  const { orderingRules, pageGroups } = readInput();
  const pageGroupOrderStatuses = pageGroups.map((_) => true);

  for (const page of orderingRules.keys()) {
    for (const afterPage of orderingRules.get(page)!) {
      for (let i = 0; i < pageGroups.length; i++) {
        const pageGroup = pageGroups[i];
        if (pageGroupOrderStatuses[i] && (pageGroup.indexOf(page) < 0 || pageGroup.indexOf(afterPage) < 0)) {
          continue;
        }

        if (pageGroup.indexOf(page) > pageGroup.indexOf(afterPage)) {
          pageGroupOrderStatuses[i] = false;
        }
      }
    }
  }

  const result = pageGroups
    .map((group, i) => (pageGroupOrderStatuses[i] ? group[Math.floor(group.length / 2)] : 0))
    .reduce((x, y) => x + y, 0);

  return result;
};

export const problem2 = () => {
  const { orderingRules, pageGroups } = readInput();
  const pageGroupOrderStatuses = pageGroups.map((_) => true);

  for (const page of orderingRules.keys()) {
    for (const afterPage of orderingRules.get(page)!) {
      for (let i = 0; i < pageGroups.length; i++) {
        const pageGroup = pageGroups[i];
        if (pageGroupOrderStatuses[i] && (pageGroup.indexOf(page) < 0 || pageGroup.indexOf(afterPage) < 0)) {
          continue;
        }

        if (pageGroup.indexOf(page) > pageGroup.indexOf(afterPage)) {
          pageGroupOrderStatuses[i] = false;
        }
      }
    }
  }

  for (let i = 0; i < pageGroups.length; i++) {
    if (pageGroupOrderStatuses[i]) {
      continue;
    }
    const pageGroup = pageGroups[i];
    pageGroup.sort((a, b) => (orderingRules.get(a)?.includes(b) ? 1 : -1));
  }

  const result = pageGroups
    .map((group, i) => (pageGroupOrderStatuses[i] ? 0 : group[Math.floor(group.length / 2)]))
    .reduce((x, y) => x + y, 0);

  return result;
};

const readInput = () => {
  const groups = fs.readFileSync(path.join(__dirname, './input.txt')).toString().split('\n\n');

  const [orderingRulesRaw, pageGroupsRaw] = groups;

  const orderingRules = new Map<number, number[]>();
  orderingRulesRaw.split('\n').forEach((line) => {
    const [page, afterPage] = line.split('|').map(Number);

    const existingRule = orderingRules.get(page);
    if (existingRule) {
      existingRule.push(afterPage);
    } else {
      orderingRules.set(page, [afterPage]);
    }
  });

  return {
    orderingRules,
    pageGroups: pageGroupsRaw.split('\n').map((group) => group.split(',').map(Number)),
  };
};
