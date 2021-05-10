import * as React from 'react';
import {ILink, ILinkType, FieldGroup} from '../../domain';

function useLastNonNull<V>(value: null | V) {
    const valueRef = React.useRef(value);

    if (value !== null) {
        valueRef.current = value;
    }

    return valueRef.current;
}

export const LinkEditor: React.FC<{
    link: null | ILink
    linkType: ILinkType
}> = props => {
    if (props.link === null) {
        return (
            <LinkEditorWithoutValue
                linkType={props.linkType}
            />
        );
    } else {
        return (
            <LinkEditorWithValue
                link={props.link}
                linkType={props.linkType}
            />
        );
    }
};

const LinkEditorWithoutValue: React.FC<{
    linkType: ILinkType
}> = props => {
    const {Editor} = props.linkType;
    const prefix = `linkTypeProps.${props.linkType.id.split('.').join('_')}`;

    return (
        <FieldGroup prefix={prefix}>
            <Editor
                model={null}
                link={null}
            />
        </FieldGroup>
    );
}

const LinkEditorWithValue: React.FC<{
    link: ILink
    linkType: ILinkType
}> = props => {
    const {busy, error, result} = props.linkType.useResolvedModel(props.link);
    const model = useLastNonNull(result);
    const {Editor, LoadingEditor} = props.linkType;

    if (error) {
        throw error;
    } else if (busy && !model) {
        return (<LoadingEditor link={props.link ?? undefined} />);
    } else {
        return (
            <FieldGroup prefix={`linkTypeProps.${props.linkType.id.split('.').join('_')}`}>
                <Editor
                    model={model}
                    link={props.link}
                />
            </FieldGroup>
        );
    }
}