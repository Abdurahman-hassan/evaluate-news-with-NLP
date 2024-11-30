import { handleSubmit } from '../client/js/formHandler';

describe('Form Handler', () => {
    let mockEvent;

    beforeEach(() => {
        mockEvent = { preventDefault: jest.fn() };
        // Updated mock for `fetch`
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({
                polarity: 'Neutral',
                subjectivity: 'Subjective',
                text: 'Sample text'
            })
        });
        global.document.getElementById = jest.fn();
    });

    test('prevents default form submission', () => {
        document.getElementById.mockReturnValueOnce({ value: 'https://example.com' });
        document.getElementById.mockReturnValueOnce({ innerHTML: '' });

        handleSubmit(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test('displays loading state and updates with response', async () => {
        const mockResultsDiv = { innerHTML: '' };
        document.getElementById.mockReturnValueOnce({ value: 'https://example.com' });
        document.getElementById.mockReturnValueOnce(mockResultsDiv);

        // Call handleSubmit and check if 'Loading...' is displayed
        const handlePromise = handleSubmit(mockEvent);
        expect(mockResultsDiv.innerHTML).toContain('Loading');

        // Wait for the handleSubmit promise to resolve and then check if results are displayed
        await handlePromise;
        expect(mockResultsDiv.innerHTML).toContain('Analysis Results');
    });
});
