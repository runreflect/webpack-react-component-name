// Generated from https://github.com/CharlesStover/use-react-router
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_1 = require("react-router");
var use_force_update_1 = require("./use-force-update");
var INCORRECT_VERSION_ERROR = new Error('use-react-router may only be used with react-router@^5.');
var MISSING_CONTEXT_ERROR = new Error('useReactRouter may only be called within a <Router /> context.');
function useRouter() {
    if (!react_router_1.__RouterContext) {
        throw INCORRECT_VERSION_ERROR;
    }
    var context = react_1.useContext(react_router_1.__RouterContext);
    if (!context) {
        throw MISSING_CONTEXT_ERROR;
    }
    var forceUpdate = use_force_update_1.default();
    react_1.useEffect(function () {
        return context.history.listen(forceUpdate);
    }, [context]);
    return context;
}
exports.default = useRouter;
