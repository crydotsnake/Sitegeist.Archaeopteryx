import * as React from 'react';
import {Object} from 'ts-toolbelt';

import {useGlobalRegistry} from '@sitegeist/archaeopteryx-neos-bridge';

import {IProcess} from '../Process';

import {ILink} from './Link';

interface LinkTypeProps<ModelType = any> {
    link: ILink
    model: ModelType
}

export interface ILinkType<ModelType = any> {
    id: string
    enableLinkOptionsWhenPossible: boolean
    isSuitableFor: (link: ILink) => boolean

    useResolvedModel: (link: ILink) => IProcess<ModelType>
    convertModelToLink: (model: ModelType) => ILink

    TabHeader: React.FC<{link?: ILink}>
    LoadingPreview: React.FC<{link?: ILink}>
    Preview: React.FC<LinkTypeProps<ModelType>>
    LoadingEditor: React.FC<{link?: ILink}>
    Editor: React.FC<Object.Nullable<LinkTypeProps<ModelType>, 'link' | 'model'>>
}

export interface ILinkTypeFactoryApi {
    createError: (message: string) => Error
}

export function makeLinkType<ModelType = any>(
    id: string,
    createOptions: (factoryApi: ILinkTypeFactoryApi) => Object.Optional<
        Omit<ILinkType<ModelType>, 'id'>,
        'enableLinkOptionsWhenPossible' | 'Icon' | 'Title' | 'LoadingPreview' | 'LoadingEditor'
    >
): ILinkType<ModelType> {
    const createError = (message: string) => new Error(`[${id}]: ${message}`);
    const options = createOptions({createError});

    return {
        id,
        enableLinkOptionsWhenPossible: false,
        ...options,
        LoadingPreview: options.LoadingPreview ?? (() => React.createElement(
            'div',
            {},
            'Loading...'
        )),
        LoadingEditor: options.LoadingEditor ?? (() => React.createElement(
            'div',
            {},
            'Loading...'
        ))
    };
}

export function useLinkTypes(): ILinkType[] {
    const globalRegistry = useGlobalRegistry();
    return globalRegistry.get('@sitegeist/archaeopteryx/link-types')?.getAllAsList() ?? [];
}

export function useLinkTypeForHref(href: null | string): null | ILinkType {
    const linkTypes = useLinkTypes();
    const result = React.useMemo(() => {
        if (href === null) {
            return null;
        }

        for (const linkType of [...linkTypes].reverse()) {
            if (linkType.isSuitableFor({href})) {
                return linkType;
            }
        }

        return null;
    }, [linkTypes, href]);

    return result;
}