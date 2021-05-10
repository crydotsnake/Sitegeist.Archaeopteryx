import {createAction} from 'typesafe-actions';
import {ILink} from '../Link';

export const EditorWasOpened = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/EditorWasOpened',
    (value: null | ILink, enableOptions: boolean = false) => ({value, enableOptions})
)();

export const EditorWasDismissed = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/EditorWasDismissed'
)();

export const ValueWasUpdated = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/ValueWasUpdated',
    (value: Partial<ILink>) => value
)();

export const ValueWasUnset = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/ValueWasUnset'
)();

export const ValueWasReset = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/ValueWasReset'
)();

export const ValueWasApplied = createAction(
    'http://sitegeist.de/Sitegeist.Archaeopteryx/ValueWasApplied',
    (value: null | ILink) => value
)();
