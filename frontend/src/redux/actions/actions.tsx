import { OptionsObject as SnackbarProps } from 'notistack';
import { AppLogoType } from '../../components/App/AppLogo';
import { ClusterChooserType } from '../../components/cluster/ClusterChooser';
import { ResourceTableProps } from '../../components/common/Resource/ResourceTable';
import { DetailsViewSectionType } from '../../components/DetailsViewSection';
import { SidebarEntryProps } from '../../components/Sidebar';
import { Notification } from '../../lib/notification';
import { Route } from '../../lib/router';
import { UIState } from '../reducers/ui';

export const CLUSTER_ACTION = 'CLUSTER_ACTION';
export const CLUSTER_ACTION_UPDATE = 'CLUSTER_ACTION_UPDATE';
export const CLUSTER_ACTION_CANCEL = 'CLUSTER_ACTION_CANCEL';
export const UI_SIDEBAR_SET_SELECTED = 'UI_SIDEBAR_SET_SELECTED';
export const UI_SIDEBAR_SET_VISIBLE = 'UI_SIDEBAR_SET_VISIBLE';
export const UI_SIDEBAR_SET_ITEM = 'UI_SIDEBAR_SET_ITEM';
export const UI_SIDEBAR_SET_ITEM_FILTER = 'UI_SIDEBAR_SET_ITEM_FILTER';
export const UI_SIDEBAR_SET_EXPANDED = 'UI_SIDEBAR_SET_EXPANDED';
export const UI_ROUTER_SET_ROUTE = 'UI_ROUTER_SET_ROUTE';
export const UI_ROUTER_SET_ROUTE_FILTER = 'UI_ROUTER_SET_ROUTE_FILTER';
export const UI_DETAILS_VIEW_SET_HEADER_ACTION = 'UI_DETAILS_VIEW_SET_HEADER_ACTION';
export const UI_DETAILS_VIEW_ADD_HEADER_ACTIONS_PROCESSOR =
  'UI_DETAILS_VIEW_ADD_HEADER_ACTIONS_PROCESSOR';
export const UI_ADD_TABLE_COLUMNS_PROCESSOR = 'UI_ADD_TABLE_COLUMNS_PROCESSOR';
export const UI_SET_DETAILS_VIEW = 'UI_SET_DETAILS_VIEW';
export const UI_THEME_SET = 'UI_THEME_SET';
export const UI_INITIALIZE_PLUGIN_VIEWS = 'UI_INITIALIZE_PLUGIN_VIEWS';
export const UI_PLUGINS_LOADED = 'UI_PLUGINS_LOADED';
export const UI_VERSION_DIALOG_OPEN = 'UI_VERSION_DIALOG_OPEN';
export const UI_BRANDING_SET_APP_LOGO = 'UI_BRANDING_SET_APP_LOGO';
export const UI_SET_CLUSTER_CHOOSER_BUTTON = 'UI_SET_CLUSTER_CHOOSER_BUTTON';
export const UI_HIDE_APP_BAR = 'UI_HIDE_APP_BAR';
export const UI_FUNCTIONS_OVERRIDE = 'UI_FUNCTIONS_OVERRIDE';

export interface BrandingProps {
  logo: AppLogoType;
}
export const UI_SET_NOTIFICATIONS = 'UI_SET_NOTIFICATIONS';
export const UI_UPDATE_NOTIFICATION = 'UI_UPDATE_NOTIFICATION';

export interface ClusterActionButton {
  label: string;
  actionToDispatch: string;
}

export interface ClusterAction {
  id: string;
  key?: string;
  message?: string;
  url?: string;
  buttons?: ClusterActionButton[];
  dismissSnackbar?: string;
  snackbarProps?: SnackbarProps;
}

export interface CallbackAction extends CallbackActionOptions {
  callback: (...args: any[]) => void;
}

export interface CallbackActionOptions {
  startUrl?: string;
  cancelUrl?: string;
  errorUrl?: string;
  successUrl?: string;
  startMessage?: string;
  cancelledMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  startOptions?: SnackbarProps;
  cancelledOptions?: SnackbarProps;
  successOptions?: SnackbarProps;
  errorOptions?: SnackbarProps;
  cancelCallback?: (...args: any[]) => void;
}

export interface Action {
  type: string;
  [propName: string]: any;
}

type SidebarType = UIState['sidebar'];

export type TableColumnsProcessor = {
  /** Unique ID for this processor. */
  id: string;
  /** Function that will be called to process the columns.
   * @param args.id The table ID.
   * @param args.columns The current table columns.
   *
   * @returns The new table columns.
   */
  processor: (args: {
    id: string;
    columns: ResourceTableProps['columns'];
  }) => ResourceTableProps['columns'];
};

export function clusterAction(
  callback: CallbackAction['callback'],
  actionOptions: CallbackActionOptions = {}
) {
  return { type: CLUSTER_ACTION, callback, ...actionOptions };
}

export function updateClusterAction(actionOptions: ClusterAction) {
  return { type: CLUSTER_ACTION_UPDATE, ...actionOptions };
}

export function setSidebarSelected(selected: string | null, sidebar: string | null = '') {
  return { type: UI_SIDEBAR_SET_SELECTED, selected: { item: selected, sidebar } };
}

export function setWhetherSidebarOpen(isSidebarOpen: boolean) {
  localStorage.setItem('sidebar', JSON.stringify({ shrink: !isSidebarOpen }));
  return { type: UI_SIDEBAR_SET_EXPANDED, isSidebarOpen, isSidebarOpenUserSelected: isSidebarOpen };
}

export function setHideAppBar(hideAppBar: boolean | undefined) {
  return { type: UI_HIDE_APP_BAR, hideAppBar };
}

export function setSidebarVisible(isVisible: SidebarType['isVisible']) {
  return { type: UI_SIDEBAR_SET_VISIBLE, isVisible };
}

export function setSidebarItem(item: SidebarEntryProps) {
  // @todo: Clarify the spec when we port this to Ts.
  if (item.parent === undefined) {
    item['parent'] = null;
  }
  return { type: UI_SIDEBAR_SET_ITEM, item };
}

export function setSidebarItemFilter(
  filterFunc: (entry: SidebarEntryProps) => SidebarEntryProps | null
) {
  return { type: UI_SIDEBAR_SET_ITEM_FILTER, filterFunc };
}

export function setRoute(routeSpec: Route) {
  return { type: UI_ROUTER_SET_ROUTE, route: routeSpec };
}

export function setRouteFilter(filterFunc: (entry: Route) => Route | null) {
  return { type: UI_ROUTER_SET_ROUTE_FILTER, filterFunc };
}

export function addResourceTableColumnsProcessor(
  tableProcessor: TableColumnsProcessor | TableColumnsProcessor['processor']
) {
  let tableColsProcessor = tableProcessor as TableColumnsProcessor;
  if (tableColsProcessor.id === undefined && typeof tableProcessor === 'function') {
    tableColsProcessor = {
      id: '',
      processor: tableProcessor,
    };
  }
  return { type: UI_ADD_TABLE_COLUMNS_PROCESSOR, action: tableColsProcessor };
}

export function setDetailsView(viewSection: DetailsViewSectionType) {
  return {
    type: UI_SET_DETAILS_VIEW,
    action: viewSection,
  };
}

export function setTheme(name?: string) {
  return { type: UI_THEME_SET, theme: { name } };
}

export function setBrandingAppLogoComponent(component: AppLogoType) {
  return { type: UI_BRANDING_SET_APP_LOGO, component };
}

export function setUINotifications(notifications: Notification[] | Notification) {
  return { type: UI_SET_NOTIFICATIONS, notifications };
}

export function updateUINotification(dispatchedNotification: Notification[] | Notification) {
  return { type: UI_UPDATE_NOTIFICATION, dispatchedNotification };
}
export function setClusterChooserButtonComponent(component: ClusterChooserType) {
  return { type: UI_SET_CLUSTER_CHOOSER_BUTTON, component };
}

export function setVersionDialogOpen(isVersionDialogOpen: boolean) {
  return { type: UI_VERSION_DIALOG_OPEN, isVersionDialogOpen };
}

export type FunctionsToOverride = {
  [key: string]: (...args: any) => any;
};

export function setFunctionsToOverride(override: FunctionsToOverride) {
  return { type: UI_FUNCTIONS_OVERRIDE, override };
}
