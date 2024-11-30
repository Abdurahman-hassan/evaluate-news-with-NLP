import { checkForURL } from '../client/js/urlChecker';

describe('URL Validator', () => {
    test('validates correct http URL', () => {
        expect(checkForURL('http://example.com')).toBe(true);
    });

    test('validates correct https URL', () => {
        expect(checkForURL('https://example.com/news/article')).toBe(true);
    });

    test('rejects URL without protocol', () => {
        expect(checkForURL('example.com')).toBe(false);
    });

    test('rejects invalid URLs', () => {
        expect(checkForURL('not-a-url')).toBe(false);
        expect(checkForURL('http:/example')).toBe(false);
    });
});
