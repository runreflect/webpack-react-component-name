
export const dashboardStatesByName = addDashboardParentToStates(addNamesToStates(dashboardStateConfigs));
const topLevelStates = addNamesToStates(topLevelStateConfigs);

export const webappStates = (Object.values(dashboardStatesByName))
  .concat(Object.values(topLevelStates));

export const topLevelRoutingRules = routingRules;

export const defaultState = dashboardStatesByName.index;
export const syndicationDefaultState = dashboardStatesByName['syndication.summary'];
export const loggedOutDefaultState = topLevelStates.login;

function addDashboardParentToStates(arg1) { arg1 }
function addNamesToStates(arg1) { arg1 }
