import { server } from '__msw__/node';

vi.mock('zustand');
vi.mock('nanoid');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
