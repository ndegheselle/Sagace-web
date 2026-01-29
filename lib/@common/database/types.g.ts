/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Articles = "articles",
	Clients = "clients",
	Companies = "companies",
	Estimates = "estimates",
	EstimatesArticles = "estimates_articles",
	EstimatesServices = "estimates_services",
	Invoices = "invoices",
	InvoicesArticles = "invoices_articles",
	InvoicesServices = "invoices_services",
	Services = "services",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export enum ArticlesVatRateTypeOptions {
	"STANDARD" = "STANDARD",
	"INTERMEDIATE" = "INTERMEDIATE",
	"REDUCED" = "REDUCED",
	"SPECIAL" = "SPECIAL",
	"EXEMPT" = "EXEMPT",
}
export type ArticlesRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	name?: string
	quantity?: number
	sku?: string
	unitPrice?: number
	updated: IsoAutoDateString
	vatRateType?: ArticlesVatRateTypeOptions
}

export type ClientsRecord = {
	adress?: string
	companyName?: string
	created: IsoAutoDateString
	email?: string
	firstName?: string
	id: string
	lastName?: string
	phone?: string
	updated: IsoAutoDateString
}

export type CompaniesRecord = {
	SIRET?: string
	adress?: string
	created: IsoAutoDateString
	email?: string
	id: string
	logo?: FileNameString
	name?: string
	phone?: string
	updated: IsoAutoDateString
}

export enum EstimatesStatusOptions {
	"TEMPLATE" = "TEMPLATE",
	"DRAFT" = "DRAFT",
	"SENT" = "SENT",
	"ACCEPTED" = "ACCEPTED",
	"REFUSED" = "REFUSED",
}
export type EstimatesRecord = {
	articles?: RecordIdString
	client?: RecordIdString
	created: IsoAutoDateString
	id: string
	notes?: string
	reference?: string
	services?: RecordIdString
	status?: EstimatesStatusOptions
	updated: IsoAutoDateString
}

export type EstimatesArticlesRecord = {
	article?: RecordIdString
	created: IsoAutoDateString
	id: string
	quantity?: number
	unitPrice?: number
	updated: IsoAutoDateString
	vatRate?: number
}

export type EstimatesServicesRecord = {
	created: IsoAutoDateString
	id: string
	quantity?: number
	service?: RecordIdString
	unitPrice?: number
	updated: IsoAutoDateString
	vatRate?: number
}

export enum InvoicesStatusOptions {
	"ISSUED" = "ISSUED",
	"PAID" = "PAID",
	"OVERDUE" = "OVERDUE",
	"CANCELLED" = "CANCELLED",
}
export type InvoicesRecord = {
	articles?: RecordIdString
	client: RecordIdString
	created: IsoAutoDateString
	dueDate: IsoDateString
	estimate: RecordIdString
	id: string
	invoiceNumber: string
	issuedAt: IsoDateString
	notes?: string
	paidAt?: IsoDateString
	reference?: string
	services?: RecordIdString
	status?: InvoicesStatusOptions
	updated: IsoAutoDateString
}

export type InvoicesArticlesRecord = {
	article?: RecordIdString
	created: IsoAutoDateString
	id: string
	quantity?: number
	unitPrice?: number
	updated: IsoAutoDateString
	vatRate?: number
}

export type InvoicesServicesRecord = {
	created: IsoAutoDateString
	id: string
	quantity?: number
	service?: RecordIdString
	unitPrice?: number
	updated: IsoAutoDateString
	vatRate?: number
}

export enum ServicesVatRateTypeOptions {
	"STANDARD" = "STANDARD",
	"INTERMEDIATE" = "INTERMEDIATE",
	"REDUCED" = "REDUCED",
	"SPECIAL" = "SPECIAL",
	"EXEMPT" = "EXEMPT",
}
export type ServicesRecord = {
	code?: string
	created: IsoAutoDateString
	description?: string
	durationHours?: number
	id: string
	name?: string
	unitPrice?: number
	updated: IsoAutoDateString
	vatRateType?: ServicesVatRateTypeOptions
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ArticlesResponse<Texpand = unknown> = Required<ArticlesRecord> & BaseSystemFields<Texpand>
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type CompaniesResponse<Texpand = unknown> = Required<CompaniesRecord> & BaseSystemFields<Texpand>
export type EstimatesResponse<Texpand = unknown> = Required<EstimatesRecord> & BaseSystemFields<Texpand>
export type EstimatesArticlesResponse<Texpand = unknown> = Required<EstimatesArticlesRecord> & BaseSystemFields<Texpand>
export type EstimatesServicesResponse<Texpand = unknown> = Required<EstimatesServicesRecord> & BaseSystemFields<Texpand>
export type InvoicesResponse<Texpand = unknown> = Required<InvoicesRecord> & BaseSystemFields<Texpand>
export type InvoicesArticlesResponse<Texpand = unknown> = Required<InvoicesArticlesRecord> & BaseSystemFields<Texpand>
export type InvoicesServicesResponse<Texpand = unknown> = Required<InvoicesServicesRecord> & BaseSystemFields<Texpand>
export type ServicesResponse<Texpand = unknown> = Required<ServicesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	articles: ArticlesRecord
	clients: ClientsRecord
	companies: CompaniesRecord
	estimates: EstimatesRecord
	estimates_articles: EstimatesArticlesRecord
	estimates_services: EstimatesServicesRecord
	invoices: InvoicesRecord
	invoices_articles: InvoicesArticlesRecord
	invoices_services: InvoicesServicesRecord
	services: ServicesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	articles: ArticlesResponse
	clients: ClientsResponse
	companies: CompaniesResponse
	estimates: EstimatesResponse
	estimates_articles: EstimatesArticlesResponse
	estimates_services: EstimatesServicesResponse
	invoices: InvoicesResponse
	invoices_articles: InvoicesArticlesResponse
	invoices_services: InvoicesServicesResponse
	services: ServicesResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
