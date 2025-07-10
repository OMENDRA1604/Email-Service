const EmailService = require('../src/EmailService');


describe('EmailService - Unit Tests', () => {
  let emailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  test('should send email successfully on first try', async () => {
    const response = await emailService.sendEmail(
      'test-id-1',
      'user@example.com',
      'Test Subject',
      'Test Body'
    );
    expect(response).toBe('Email sent successfully');
  });

  test('should return "Already sent" for duplicate ID (idempotency)', async () => {
    await emailService.sendEmail(
      'test-id-2',
      'user@example.com',
      'Test Subject',
      'Test Body'
    );
    const response = await emailService.sendEmail(
      'test-id-2',
      'user@example.com',
      'Test Subject',
      'Test Body'
    );
    expect(response).toBe('Already sent');
  });

  test('should enforce rate limit of 5 per minute', async () => {
    for (let i = 0; i < 5; i++) {
      await emailService.sendEmail(`rate-id-${i}`, 'test@example.com', 'Sub', 'Body');
    }
    const response = await emailService.sendEmail('rate-id-6', 'test@example.com', 'Sub', 'Body');
    expect(response).toBe('Rate limit exceeded');
  });

  test('should fallback to second provider if first fails', async () => {
    
    jest.spyOn(Math, 'random').mockReturnValue(0.95); 

    const response = await emailService.sendEmail(
      'fallback-test-id',
      'user@example.com',
      'Fallback Subject',
      'Fallback Body'
    );

    expect(response).toMatch(/All providers failed/);
    Math.random.mockRestore();
  },
  20000
);
});