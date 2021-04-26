import * as React from 'react';

import {LinkType, ILinkTypeProps} from '../../../domain';

export const WebLink = new class extends LinkType {
    public readonly isSuitableFor = (props: ILinkTypeProps) => {
        const isHttp = props.link?.uri.startsWith('http://');
        const isHttps = props.link?.uri.startsWith('https://');

        return Boolean(isHttp || isHttps);
    }

    public readonly getIcon = () => (
        <div>ICON</div>
    );

    public readonly getTitle = (props: ILinkTypeProps) => {
        const isSecure = props.link?.uri.startsWith('https://');

        if (isSecure === true) {
            return 'Web Link (secure)';
        } else if (isSecure === false) {
            return 'Web Link (not secure)';
        } else {
            return 'Web Link';
        }
    }

    public readonly getPreview = (props: ILinkTypeProps) => (
        <div>{this.getTitle(props)}</div>
    );

    public readonly getEditor = () => (
        <div>EDITOR</div>
    );
}