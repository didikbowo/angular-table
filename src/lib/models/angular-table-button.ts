export interface AngularTableButton {
    type: 'modal' | 'route' | 'separator' | 'self' | 'callback';
    action?: 'view' | 'edit' | 'delete' | 'download' | 'other';
    label?: string;
    icon?: string;
    param?: {};
    componentModal?: any;
    route?: string;
    routeParam?: {};
    queryParam?: {};
    hideButton?: boolean;
    callback?: any;
    permissions?: string[];
    visible?: any;
}
