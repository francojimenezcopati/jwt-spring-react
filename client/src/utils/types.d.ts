import { TASK_FILTERS } from './consts';

export interface TaskRequest {
	title: string;
	description: string;
	done: boolean;
}

export interface Task {
	id: number;
	title: string;
	description: string;
	done: boolean;
	createdAt: string;
}

export type Id = Task['id'];
export type Title = Task['title'];
export type Description = Task['description'];
export type Done = Task['done'];
export type CreatedAt = Task['createdAt'];

export type FilterValue = (typeof TASK_FILTERS)[keyof typeof TASK_FILTERS];

interface TaskContextType {
	activeCount: number;
	completedCount: number;
	filteredTasks: Task[];
	filterSelected: FilterValue;
	onClearCompleted: () => void;
	handleFilterChange: ({ filter }: { filter: FilterValue }) => void;
	handleDelete: ({ id }: { id: number }) => void;
	handleUpdate: ({ id, task }: { id: number; task: Task }) => void;
	handleCreate: ({ task }: { task: TaskRequest }) => void;
}

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface AuthContextType {
	handleRegister: ({
		firstName,
		lastName,
		email,
		password,
	}: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}) => Promise<void>;
	handleLogin: ({ email, password }: { email: string; password: string }) => Promise<void>;
	tokens: Tokens | null;
	userRole: UserRoles | null;
	handleLogout: () => void;
}

export type UserRoles = 'ADMIN' | 'USER';

export interface TokenClaims {
	iss?: string;
	sub?: string;
	aud?: string[] | string;
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
	name: string;
	role: string;
}

export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	content: T;
	status: HttpStatusString;
}

export type HttpStatusString =
	| 'CONTINUE'
	| 'SWITCHING_PROTOCOLS'
	| 'PROCESSING'
	| 'EARLY_HINTS'
	| 'OK'
	| 'CREATED'
	| 'ACCEPTED'
	| 'NON_AUTHORITATIVE_INFORMATION'
	| 'NO_CONTENT'
	| 'RESET_CONTENT'
	| 'PARTIAL_CONTENT'
	| 'MULTI_STATUS'
	| 'ALREADY_REPORTED'
	| 'IM_USED'
	| 'MULTIPLE_CHOICES'
	| 'MOVED_PERMANENTLY'
	| 'FOUND'
	| 'SEE_OTHER'
	| 'NOT_MODIFIED'
	| 'USE_PROXY'
	| 'TEMPORARY_REDIRECT'
	| 'PERMANENT_REDIRECT'
	| 'BAD_REQUEST'
	| 'UNAUTHORIZED'
	| 'PAYMENT_REQUIRED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'METHOD_NOT_ALLOWED'
	| 'NOT_ACCEPTABLE'
	| 'PROXY_AUTHENTICATION_REQUIRED'
	| 'REQUEST_TIMEOUT'
	| 'CONFLICT'
	| 'GONE'
	| 'LENGTH_REQUIRED'
	| 'PRECONDITION_FAILED'
	| 'PAYLOAD_TOO_LARGE'
	| 'URI_TOO_LONG'
	| 'UNSUPPORTED_MEDIA_TYPE'
	| 'RANGE_NOT_SATISFIABLE'
	| 'EXPECTATION_FAILED'
	| 'I_AM_A_TEAPOT'
	| 'MISDIRECTED_REQUEST'
	| 'UNPROCESSABLE_ENTITY'
	| 'LOCKED'
	| 'FAILED_DEPENDENCY'
	| 'TOO_EARLY'
	| 'UPGRADE_REQUIRED'
	| 'PRECONDITION_REQUIRED'
	| 'TOO_MANY_REQUESTS'
	| 'REQUEST_HEADER_FIELDS_TOO_LARGE'
	| 'UNAVAILABLE_FOR_LEGAL_REASONS'
	| 'INTERNAL_SERVER_ERROR'
	| 'NOT_IMPLEMENTED'
	| 'BAD_GATEWAY'
	| 'SERVICE_UNAVAILABLE'
	| 'GATEWAY_TIMEOUT'
	| 'HTTP_VERSION_NOT_SUPPORTED'
	| 'VARIANT_ALSO_NEGOTIATES'
	| 'INSUFFICIENT_STORAGE'
	| 'LOOP_DETECTED'
	| 'NOT_EXTENDED'
	| 'NETWORK_AUTHENTICATION_REQUIRED';
