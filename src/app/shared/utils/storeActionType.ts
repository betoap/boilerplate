
export function isActionType ( store, action ) {
  return store['actionsObserver']._value.type === action;
}
