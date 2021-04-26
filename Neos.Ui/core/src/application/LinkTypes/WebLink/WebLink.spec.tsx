import '@testing-library/jest-dom/extend-expect';

import * as React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

import {WebLink} from './WebLink';

describe('WebLinkEditor', () => {
    it('is satisfied by http:// links', () => {
        const props = {
            link: {
                uri: 'http://www.example.com'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(true);
    });

    it('is satisfied by https:// links', () => {
        const props = {
            link: {
                uri: 'https://www.example.com'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(true);
    });

    it('is not satisfied by node:// links', () => {
        const props = {
            link: {
                uri: 'node://97c9a6e3-4b50-4559-9f60-b5ad68f25758'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(false);
    });

    it('is not satisfied by asset:// links', () => {
        const props = {
            link: {
                uri: 'asset://97c9a6e3-4b50-4559-9f60-b5ad68f25758'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(false);
    });

    it('is not satisfied by mailto: links', () => {
        const props = {
            link: {
                uri: 'mailto:foo@example.com'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(false);
    });

    it('is not satisfied by invalid links', () => {
        const props = {
            link: {
                uri: 'Think of Beethoven\'s 5th: foo foo foo bar'
            }
        };

        expect(WebLink.isSuitableFor(props))
            .toBe(false);
    });

    it('returns title for undefined links', () => {
        expect(WebLink.getTitle({}))
            .toBe('Web Link');
    });

    it('returns title for insecure links', () => {
        expect(WebLink.getTitle({link: {uri: 'http://www.example.com'}}))
            .toBe('Web Link (not secure)');
    });

    it('returns title for secure links', () => {
        expect(WebLink.getTitle({link: {uri: 'https://www.example.com'}}))
            .toBe('Web Link (secure)');
    });

    it('renders preview for insecure links', async () => {
        const {getPreview: Preview} = WebLink;

        render(<Preview link={{uri: 'http://www.example.com'}}/>);

        const els = await screen.findAllByText('Web Link (not secure)');

        expect(els.length).toBe(1);
        expect(els[0].innerHTML).toContain('Web Link (not secure)');
    });

    it('renders preview for secure links', async () => {
        const {getPreview: Preview} = WebLink;

        render(<Preview link={{uri: 'https://www.example.com'}}/>);

        const els = await screen.findAllByText('Web Link (secure)');

        expect(els.length).toBe(1);
        expect(els[0].innerHTML).toContain('Web Link (secure)');
    });
});