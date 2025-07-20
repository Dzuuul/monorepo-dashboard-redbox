import { pgTable, serial, bigint, varchar, smallint, text, timestamp, index, foreignKey, unique, integer, date, type AnyPgColumn, boolean, numeric, uuid, time } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const migrations = pgTable("migrations", {
	id: serial().primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	timestamp: bigint({ mode: "number" }).notNull(),
	name: varchar().notNull(),
});

export const script = pgTable("script", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('For name the script').notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	messageBody: varchar({ length: 255 }).default('').notNull(),
	footer: text().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users: any = pgTable("users", {
	id: serial().primaryKey().notNull(),
	occupancyId: integer(),
	mediaId: integer(),
	password: varchar({ length: 255 }),
	email: varchar({ length: 50 }),
	createdBy: integer().default(0).notNull(),
	updatedBy: integer().default(0).notNull(),
	deletedBy: integer().default(0).notNull(),
	username: varchar({ length: 50 }),
	fullname: varchar({ length: 255 }).default('').notNull(),
	accountname: varchar({ length: 255 }).default('').notNull(),
	birthdate: date(),
	gender: varchar({ length: 10 }).default('').notNull(),
	address: text(),
	zipcode: varchar({ length: 10 }).default('').notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	age: integer().default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	coupon: bigint({ mode: "number" }).default(sql`'0'`),
	province: varchar({ length: 255 }).default(''),
	regency: varchar({ length: 255 }).default(''),
	district: varchar({ length: 255 }).default(''),
	provinceKtp: varchar("province_ktp", { length: 255 }).default(''),
	regencyKtp: varchar("regency_ktp", { length: 255 }).default(''),
	districtKtp: varchar("district_ktp", { length: 255 }).default(''),
	hp: varchar({ length: 50 }),
	identity: varchar({ length: 50 }),
	idType: integer("id_type").default(0).notNull(),
	refCode: varchar("ref_code", { length: 50 }),
	versionIos: varchar({ length: 50 }).default('0'),
	versionAndroid: varchar({ length: 50 }).default('0'),
	refferer: integer().default(0),
	point: integer().default(0),
	countWinnerPulsa: integer("count_winner_pulsa").default(0),
	countWinnerBig: integer("count_winner_big").default(0),
	isAgree: smallint("is_agree").default(sql`'0'`).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	storeId: integer(),
	birthplace: varchar({ length: 50 }).default('').notNull(),
	specialPoint: integer("special_point").default(0),
}, (table: any) => [
	index("IDX_3f685b7ecabe1703331227aa4d").using("btree", table.updatedBy.asc().nullsLast().op("int4_ops")),
	index("IDX_867a2e0da2bb6f8682639a8918").using("btree", table.deletedBy.asc().nullsLast().op("int4_ops")),
	index("IDX_97672ac88f789774dd47f7c8be").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("IDX_d1c708d852dcfde10fa0fd12fa").using("btree", table.createdBy.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.occupancyId],
			foreignColumns: [occupancy.id],
			name: "FK_bddf11e0f679e896add76d8d235"
		}),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_e7892be32c7ef95754b65e1462c"
		}),
	foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "FK_c82cd4fa8f0ac4a74328abe997a"
		}),
	unique("UQ_97672ac88f789774dd47f7c8be3").on(table.email),
	unique("UQ_fe0bb3f6520ee0469504521e710").on(table.username),
	unique("UQ_069a9e02836eaac07913a759099").on(table.hp),
	unique("REL_c82cd4fa8f0ac4a74328abe997").on(table.storeId),
]);

export const userMobile: any = pgTable("user_mobile", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	accessId: integer(),
	userDeviceId: integer(),
	status: smallint().default(sql`'1'`).notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	password: varchar({ length: 255 }),
	username: varchar({ length: 255 }),
	fullname: varchar({ length: 255 }),
	versionAndroid: varchar("version_android", { length: 50 }),
	versionIos: varchar("version_ios", { length: 50 }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	isOnline: boolean().default(false).notNull(),
	chatHold: integer().default(0).notNull(),
	socketId: varchar("socket_id", { length: 255 }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table: any) => [
	index("IDX_091e3ae299cb5e9b801debf29c").using("btree", table.username.asc().nullsLast().op("text_ops")),
	index("IDX_b8f5e74240e4ae8cff345e9598").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_b8f5e74240e4ae8cff345e95982"
		}),
	foreignKey({
			columns: [table.accessId],
			foreignColumns: [access.id],
			name: "FK_ec7161e0441dcca971f5df4ca76"
		}),
	foreignKey({
			columns: [table.userDeviceId],
			foreignColumns: [userDevice.id],
			name: "FK_7bb725569afa8393b1dd72ffcdf"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [table.id],
			name: "FK_9db4114e27c05794132aa04d6a4"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [table.id],
			name: "FK_80ab1b89dc2fb66412a299a34d9"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [table.id],
			name: "FK_9321ab6176ce87fffc4fa445eab"
		}),
	unique("REL_b8f5e74240e4ae8cff345e9598").on(table.userId),
]);

export const productCategory = pgTable("product_category", {
	id: serial().primaryKey().notNull(),
	name: varchar().default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_44f661bd05dd27ad1a0d0493027"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_de954e7e2f041965b9d13e98e93"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_273e276f153cef7d7f11e45edac"
		}),
]);

export const product = pgTable("product", {
	id: serial().primaryKey().notNull(),
	categoryId: integer(),
	name: varchar().default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [productCategory.id],
			name: "FK_ff0c0301a95e517153df97f6812"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_806302f2d4da2a0c27eedbf34fe"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_9c29670ff9dd3fd43cf20733c19"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_2132f09f74e7e68b0f1b45ac219"
		}),
]);

export const entriesVariant = pgTable("entries_variant", {
	id: serial().primaryKey().notNull(),
	productId: integer(),
	entriesId: integer(),
	quantity: integer().default(0).notNull(),
	amount: numeric({ precision: 18, scale:  2 }).default('0').notNull(),
	totalAmount: numeric("total_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "FK_46ac293c7c210e1ba7ce3758dc6"
		}),
	foreignKey({
			columns: [table.entriesId],
			foreignColumns: [entries.id],
			name: "FK_cb8141e7f490b521c5e4203af36"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_b842757828db3b64f8f0aa7a9f4"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_2deeb60d41a8efe05b3141d1896"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_8b0146216598ea25bf52e31c3c2"
		}),
]);

export const entries = pgTable("entries", {
	id: serial().primaryKey().notNull(),
	uuid: uuid().default(sql`uuid_generate_v4()`).notNull(),
	userId: integer(),
	storeId: integer(),
	mediaId: integer(),
	validateById: integer(),
	invalidReasonId: integer(),
	approvedById: integer(),
	couponId: varchar({ length: 200 }).default('').notNull(),
	coupon: varchar({ length: 255 }).default('').notNull(),
	couponVariantId: integer(),
	sender: varchar({ length: 50 }).default('').notNull(),
	idNumber: varchar("id_number", { length: 255 }).default('').notNull(),
	idNumberAdmin: varchar("id_number_admin", { length: 100 }).default('').notNull(),
	ktpNameAdmin: varchar("ktp_name_admin", { length: 100 }).default('').notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	tglLahir: varchar({ length: 100 }).default('').notNull(),
	hp: varchar({ length: 100 }).default('').notNull(),
	city: varchar({ length: 255 }).default('').notNull(),
	invalidReasonAdmin: varchar("invalid_reason_admin", { length: 100 }).default('').notNull(),
	invalidReasonAdminId: integer(),
	message: text().notNull(),
	purchaseNo: varchar("purchase_no", { length: 255 }).default('').notNull(),
	approveReason: varchar("approve_reason", { length: 255 }).default('').notNull(),
	purchaseNoAdmin: varchar("purchase_no_admin", { length: 255 }).default('').notNull(),
	purchaseAmount: numeric("purchase_amount", { precision: 18, scale:  2 }).default('0').notNull(),
	purchaseAmountAdmin: numeric("purchase_amount_admin", { precision: 18, scale:  2 }).default('0').notNull(),
	sapName: varchar("sap_name", { length: 255 }).default('').notNull(),
	sapHp: varchar("sap_hp", { length: 100 }).default('').notNull(),
	sapAddress: text("sap_address").default('').notNull(),
	sapDistrict: varchar("sap_district", { length: 255 }).default('').notNull(),
	sapQuantity: varchar("sap_quantity", { length: 100 }).default('').notNull(),
	sapApprover: varchar("sap_approver", { length: 100 }).default('').notNull(),
	isValid: smallint("is_valid").default(sql`'0'`).notNull(),
	isValidAdmin: smallint("is_valid_admin"),
	isApproved: smallint("is_approved").default(sql`'0'`).notNull(),
	approvedByIdAdmin: smallint("approvedById_admin").default(sql`'0'`).notNull(),
	isApprovedAdmin: smallint("is_approved_admin").default(sql`'0'`).notNull(),
	totalCoupon: integer().default(0).notNull(),
	totalPoint: integer().default(0).notNull(),
	totalReminder: integer().default(0).notNull(),
	isAdditional: smallint("is_additional").default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	purchaseDate: timestamp("purchase_date", { mode: 'string' }),
	purchaseDateAdmin: timestamp("purchase_date_admin", { mode: 'string' }),
	validationDateStore: timestamp("validation_date_store", { mode: 'string' }),
	validationDateAdmin: timestamp("validation_date_admin", { mode: 'string' }),
	approvedDate: timestamp("approved_date", { mode: 'string' }),
	rcvdTime: timestamp("rcvd_time", { mode: 'string' }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }).defaultNow(),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_0a25779e23e5c64f9698352ac1").using("btree", table.rcvdTime.asc().nullsLast().op("timestamp_ops")),
	index("IDX_38bf156a49434aff535eabc397").using("btree", table.isValid.asc().nullsLast().op("int2_ops")),
	index("IDX_609f068dc1980afb1a97e56246").using("btree", table.mediaId.asc().nullsLast().op("int4_ops")),
	index("IDX_653f5e35e1323893a4638d3697").using("btree", table.invalidReasonAdminId.asc().nullsLast().op("int4_ops")),
	index("IDX_6c0f5f4abe96ce9b0b63aa3c57").using("btree", table.sender.asc().nullsLast().op("text_ops")),
	index("IDX_b03a93ac4e9fe4363af541205e").using("btree", table.uuid.asc().nullsLast().op("uuid_ops")),
	index("IDX_e186b0c87ddac0718d1f6783f9").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_e186b0c87ddac0718d1f6783f98"
		}),
	foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "FK_0c1d117a35c22290a8cfc225109"
		}),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_609f068dc1980afb1a97e562465"
		}),
	foreignKey({
			columns: [table.validateById],
			foreignColumns: [userMobile.id],
			name: "FK_8d44604d9a8e13563be81d8d065"
		}),
	foreignKey({
			columns: [table.invalidReasonId],
			foreignColumns: [invalidReason.id],
			name: "FK_8f6fd709a9b345d4e22fe541dfe"
		}),
	foreignKey({
			columns: [table.approvedById],
			foreignColumns: [userMobile.id],
			name: "FK_3644025536cafe43a08838b563a"
		}),
	foreignKey({
			columns: [table.invalidReasonAdminId],
			foreignColumns: [invalidReason.id],
			name: "FK_653f5e35e1323893a4638d3697b"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_2209e8d95534935c49265283b05"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_139e64b693059a2b8a24356c78f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_7003b8a151f9cfdf4f019d42253"
		}),
]);

export const loginSession = pgTable("login_session", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	mediaId: integer(),
	sessionId: uuid().default(sql`uuid_generate_v4()`).notNull(),
	expired: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'0'`),
	isDeleted: smallint("is_deleted").default(sql`'0'`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_98763f1bce75d5b823896f5adad"
		}),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_2ccc01fb734dd09c1cde9e52ef2"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_1f2f607bb22aeb9642db0b77cfb"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_67cc267b30568e7e0745279e0d1"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_696ce8bcdfff44e0998b1f9c622"
		}),
]);

export const media = pgTable("media", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	status: smallint().notNull(),
	code: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_c2b7e05dcd6c62f700027544d03"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_8ea5f0b26793941e3cc5f928edb"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_28e0c81fbb18e304447bfb8b12c"
		}),
]);

export const logRequest = pgTable("log_request", {
	id: serial().primaryKey().notNull(),
	mediaId: integer(),
	status: smallint().default(sql`'1'`).notNull(),
	sender: varchar({ length: 255 }).default('').notNull(),
	message: text().notNull(),
	errorMessage: text().notNull(),
	ip: varchar({ length: 255 }).default('').notNull(),
	userId: integer().default(0).notNull(),
	direction: integer().default(0).notNull(),
	isError: integer().default(0).notNull(),
	rcvdTime: timestamp("rcvd_time", { mode: 'string' }).defaultNow().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_1a3bd7e860a148090d0c852ce9").using("btree", table.sender.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_cd5b25832d2130eb20e0ca96cd3"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_eb940a0fb77399a4ae2e34521dd"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_0c21957a37fcb146b6205cc7cd4"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_dea1a6d1dc47fd59d105da139ea"
		}),
]);

export const access: any = pgTable("access", {
	id: serial().primaryKey().notNull(),
	description: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table: any) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_f3644eb12be1c0064f7c3ac3355"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_be7edea69ab07c06e216446df3b"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_b31ab0603c4e0448dceee53bd07"
		}),
]);

export const accessDet = pgTable("access_det", {
	id: serial().primaryKey().notNull(),
	accessId: integer(),
	menuId: integer(),
	mInsert: smallint("m_insert").default(sql`'0'`).notNull(),
	mUpdate: smallint("m_update").default(sql`'0'`).notNull(),
	mApprove: smallint("m_approve").default(sql`'0'`).notNull(),
	mDelete: smallint("m_delete").default(sql`'0'`).notNull(),
	mView: smallint("m_view").default(sql`'0'`).notNull(),
	sort: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accessId],
			foreignColumns: [access.id],
			name: "FK_503748495b5f9245133e471f0f2"
		}),
	foreignKey({
			columns: [table.menuId],
			foreignColumns: [menu.id],
			name: "FK_5f05c785f022a8d2ae3486e03c0"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_cc3bea481558e8e7fc6575ccd5e"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_b5615f6b6e5aa70c0cf310ad027"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_548fa2be5c66b3cebbbd48e5f81"
		}),
]);

export const menu = pgTable("menu", {
	id: serial().primaryKey().notNull(),
	mediaId: integer(),
	description: varchar({ length: 100 }).notNull(),
	level: integer().default(0).notNull(),
	header: integer().notNull(),
	path: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	icon: varchar({ length: 255 }),
	sort: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_1bdc74948af8039cf4f4ca8649f"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_255be433df52893d61df045819f"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_44f303851fc9b91ab5e03a64121"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_068d909afdb5caca32e72440582"
		}),
]);

export const responseCode = pgTable("response_code", {
	id: serial().primaryKey().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 100 }).notNull(),
	responseStatus: varchar({ length: 100 }).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_bf481193b59bfbf0de88fdb0065"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_0c88794cf3393505d410722844d"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_f1c651fd32d0bfbd1501fba806d"
		}),
]);

export const invalidReason = pgTable("invalid_reason", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).default('').notNull(),
	alias: varchar({ length: 100 }).default('').notNull(),
	templateName: varchar("template_name", { length: 255 }),
	reply: text(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_6d1a89d28c057a0488b264c9c97"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_c9c3830b00957b44c005a60f045"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_f1713a7299ed2c5f97d1abf4a9f"
		}),
	unique("UQ_cbea1d52195eea504e1fa4b3cf9").on(table.name),
	unique("UQ_da18f4d511bbb469bcdc57120dc").on(table.alias),
]);

export const validation = pgTable("validation", {
	id: serial().primaryKey().notNull(),
	invalidReasonId: integer(),
	replyValidId: integer(),
	replyInvalidId: integer(),
	mediaId: integer(),
	name: varchar({ length: 100 }).notNull(),
	functionName: varchar({ length: 100 }).notNull(),
	sort: smallint().default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.invalidReasonId],
			foreignColumns: [invalidReason.id],
			name: "FK_49501f8debca12cefad3279d0b4"
		}),
	foreignKey({
			columns: [table.replyValidId],
			foreignColumns: [reply.id],
			name: "FK_b341097eb674a88ce9a977c1b5d"
		}),
	foreignKey({
			columns: [table.replyInvalidId],
			foreignColumns: [reply.id],
			name: "FK_8bae3dbe69948562185a8dec689"
		}),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_5da96e959f4e0edaf7f05791aa4"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_eeccce19459056daa9dcd82f792"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_a0c15ecaa1d0aeec4c23af70506"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_1a2efe774fb96da9914dbe8a48d"
		}),
]);

export const reply = pgTable("reply", {
	id: serial().primaryKey().notNull(),
	mediaId: integer(),
	responseCodeId: integer(),
	name: varchar({ length: 100 }).notNull(),
	replyTypeId: integer(),
	iconPopup: varchar("icon_popup", { length: 255 }).default('').notNull(),
	titlePopup: varchar("title_popup", { length: 255 }).default('').notNull(),
	replyMessage: text("reply_message").default('').notNull(),
	templateName: varchar("template_name", { length: 255 }).default('').notNull(),
	namespace: varchar({ length: 255 }).default('').notNull(),
	waPush: boolean("wa_push").default(false).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_6661e22c03cc04a0b08c738de15"
		}),
	foreignKey({
			columns: [table.responseCodeId],
			foreignColumns: [responseCode.id],
			name: "FK_3b3a9fe2ef9236720f42a844599"
		}),
	foreignKey({
			columns: [table.replyTypeId],
			foreignColumns: [replyType.id],
			name: "FK_17db7b0fe3714e34d5f36cfc8f0"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_fe6251452c0b5625b96f2f78b68"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_152a02bf72fb4b7e666d045aab9"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_d907ab0922607464d2cc21c31b4"
		}),
]);

export const replyType = pgTable("reply_type", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	type: varchar().default('0').notNull(),
	isJson: smallint("is_json").default(sql`'0'`).notNull(),
	status: smallint().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_ee5b381c8cde51bb94196169b33"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_5fd3f5b9c8df568722620fc2730"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_69478a1e827edb24405e3480cf5"
		}),
]);

export const store = pgTable("store", {
	id: serial().primaryKey().notNull(),
	salesId: integer(),
	areaId: integer(),
	name: varchar({ length: 255 }).default('').notNull(),
	code: varchar({ length: 255 }).default('').notNull(),
	province: varchar({ length: 255 }).default('').notNull(),
	city: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.salesId],
			foreignColumns: [sales.id],
			name: "FK_b63230a2fd4c3d1b51991aeb347"
		}),
	foreignKey({
			columns: [table.areaId],
			foreignColumns: [storeArea.id],
			name: "FK_83e5a67716fb74e902852b15019"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_1e409ea707372eace1fe2c91552"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_60d2109aef77772f0646f39366a"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_45b77099b9d40206361cff5678c"
		}),
]);

export const coupon = pgTable("coupon", {
	id: serial().primaryKey().notNull(),
	storeId: integer(),
	status: smallint().default(sql`'0'`).notNull(),
	code: varchar({ length: 20 }).default('').notNull(),
	serialNumber: varchar("serial_number", { length: 30 }).default('').notNull(),
	url: varchar({ length: 255 }).default('').notNull(),
	type: integer().default(0).notNull(),
	prizeId: integer().default(0).notNull(),
	usedDate: timestamp("used_date", { mode: 'string' }).defaultNow().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_a90a9b90797b8010eaad11029f").using("btree", table.prizeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "FK_5c844474407f18320b2d16f415b"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_d56471c70d73903a892b9e797ae"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_6eabdfda05e3867b84e6694dbbd"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_9bb2fccb7969439572ff5362fcc"
		}),
	unique("UQ_62d3c5b0ce63a82c48e86d904bc").on(table.code),
	unique("UQ_aef463c380bd770ea71f60eadf7").on(table.serialNumber),
]);

export const sales = pgTable("sales", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_579a13a0f8d438c6f5a0d732556"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_0e2de179c892d8fed41ae8d1e19"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_8b2533e7f546c97e0d568594fe4"
		}),
]);

export const storeArea = pgTable("store_area", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_25bf3585780c279a83f2507719b"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_315dabc8cf652493c635bb39210"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_b74c4c7bfb72b705524eb2c1d0b"
		}),
]);

export const historyDetail = pgTable("history_detail", {
	id: serial().primaryKey().notNull(),
	historyId: integer(),
	description: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	index("IDX_e7f77fe648d74b51cad7565816").using("btree", table.historyId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.historyId],
			foreignColumns: [history.id],
			name: "FK_e7f77fe648d74b51cad75658160"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_376aa2faa82c86bd28dd7b76342"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_f68f954f91ebab32f095f674147"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ee7a76dfa65591b299e0190660d"
		}),
]);

export const userRank = pgTable("user_rank", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	userRankPeriodeId: integer(),
	rank: integer().default(0),
	point: integer().default(0),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	timeOnline: integer("time_online").default(0).notNull(),
	lastOnline: timestamp("last_online", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_1c980bfea78650c92fb6c92cb8").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_1c980bfea78650c92fb6c92cb89"
		}),
	foreignKey({
			columns: [table.userRankPeriodeId],
			foreignColumns: [userRankPeriode.id],
			name: "FK_bb7c372acafee16d2e2366271fc"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_516dc41b58b135a689ed3e4ad0a"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_0cc55faba615b58a4f65a03c91e"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_8c95b10b8dc12016f97e087464e"
		}),
]);

export const userRankPeriode = pgTable("user_rank_periode", {
	id: serial().primaryKey().notNull(),
	periode: timestamp({ mode: 'string' }),
	periodeEnd: timestamp("periode_end", { mode: 'string' }),
	description: varchar({ length: 100 }).default(''),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	timeOnline: integer("time_online").default(0).notNull(),
	lastOnline: timestamp("last_online", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_58814dd3e5789034b8ef1f4f08").using("btree", table.periodeEnd.asc().nullsLast().op("timestamp_ops")),
	index("IDX_8e3876e7366e0d6a6503439ff2").using("btree", table.periode.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_dfc0056f4835818db33a9cc3946"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_ad07464a880ba8e883601a1089b"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_afd1b1c1a0839bc20d89b74e84e"
		}),
]);

export const occupancy: any = pgTable("occupancy", {
	id: serial().primaryKey().notNull(),
	occupancy: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table: any) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_3059212aefb47c9055da6d673f5"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_57d59ba77f02d7267337915d34e"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_0ec88cfbe9fab3c9b759d7b5135"
		}),
]);

export const whiteList = pgTable("white_list", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	sender: varchar({ length: 255 }).default('').notNull(),
	idNumber: varchar("id_number", { length: 255 }).default('').notNull(),
	ip: varchar({ length: 255 }).default('').notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_ec94470edfae66c8f308119025").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_ec94470edfae66c8f3081190253"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_7e859cdbf25ff14275744720cf8"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_b89bc1820e8daa6859d592a88c3"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_23b7fe0d04c84e625fdc65ddf3c"
		}),
]);

export const otp = pgTable("otp", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	otpCode: varchar({ length: 20 }),
	hp: varchar({ length: 20 }).default(''),
	expired: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`),
	readAt: timestamp("read_at", { mode: 'string' }),
	isDeleted: smallint("is_deleted").default(sql`'0'`),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_37987ae450c49f4f4e17a852b8").using("btree", table.hp.asc().nullsLast().op("text_ops")),
	index("IDX_4fcee1f8106698f326d2213b86").using("btree", table.expired.asc().nullsLast().op("int4_ops")),
	index("IDX_db724db1bc3d94ad5ba3851843").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_db724db1bc3d94ad5ba38518433"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_752292fd8e4375ff1c5ca6cb86e"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_0ac1eed871c17e4cc870ededbbc"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_65d90ae32d349c54433bf55244f"
		}),
	unique("UQ_9856db75a9843cabfdcfd0ff398").on(table.otpCode),
]);

export const userDevice = pgTable("user_device", {
	id: serial().primaryKey().notNull(),
	imei: varchar({ length: 50 }),
	devicetype: varchar({ length: 50 }),
	language: varchar({ length: 50 }),
	manufacturer: varchar({ length: 50 }),
	model: varchar({ length: 50 }),
	os: varchar({ length: 50 }),
	osVersion: varchar({ length: 50 }),
	region: varchar({ length: 50 }),
	sdkVersion: varchar({ length: 50 }),
	heightdips: integer(),
	heightpixels: integer(),
	scale: integer(),
	widthdips: integer(),
	widthpixels: integer(),
	playerId: varchar("player_id", { length: 50 }),
	firebaseId: varchar("firebase_id", { length: 255 }),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_b1fd3129acad8eec8e06f133e74"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_5075e430ab5ca14d519c3490601"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_c8737041d70944093e72ae45b59"
		}),
]);

export const voucher = pgTable("voucher", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 255 }).notNull(),
	amount: varchar({ length: 50 }).default('0').notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	category: smallint().default(sql`'0'`).notNull(),
	status: smallint().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_8a6c0cdb2002df264d9b4a7c96b"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_8c7e56cd682a0f874691f5fe454"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_2cf7fd9e25ee26fef683f4bede0"
		}),
]);

export const prizeCategory = pgTable("prize_category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	limit: smallint().default(sql`'1'`).notNull(),
	limitPerDay: smallint().default(sql`'1'`).notNull(),
	limitPerMonth: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_28e092d44ce041e27d36b125555"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_86795dfd97167df3baf71d00537"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ee8444d5aa66146556913c8a8fb"
		}),
]);

export const prizeSetting = pgTable("prize_setting", {
	id: serial().primaryKey().notNull(),
	startTime: time().default('00:00:00'),
	endTime: time().default('00:00:00'),
	interval: integer().default(0).notNull(),
	limit: integer().default(0).notNull(),
	minAge: integer().default(0).notNull(),
	maxAge: integer().default(0).notNull(),
	minSubmit: integer().default(0).notNull(),
	maxSubmit: integer().default(0).notNull(),
	sort: integer().default(0).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	limitPerMonth: integer().default(0).notNull(),
	limitPerDay: integer().default(0).notNull(),
	limitPerPeriode: integer().default(0).notNull(),
	limitPerMonthAfterLimit: integer().default(0).notNull(),
	limitPerDayAfterLimit: integer().default(0).notNull(),
	limitPerPeriodeAfterLimit: integer().default(0).notNull(),
	purchaseMin: integer("purchase_min").default(0).notNull(),
	purchaseMax: integer("purchase_max").default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	prizeId: integer(),
}, (table) => [
	foreignKey({
			columns: [table.prizeId],
			foreignColumns: [prize.id],
			name: "FK_3e27b32e7646146f778aee289a8"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_baa4d32c481e8af54d8f955debf"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_612ab03da950532c3e4e3c0247f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ed054196c35f9ed19285ca457b1"
		}),
	unique("REL_3e27b32e7646146f778aee289a").on(table.prizeId),
]);

export const prizeType = pgTable("prize_type", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_7b1fca90407612b7bdfb1433feb"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_de1d78b2bc6b0ae87887c3fbb42"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_60096bae3d59ca4f2a6ca8efc3b"
		}),
]);

export const notification = pgTable("notification", {
	id: serial().primaryKey().notNull(),
	prizeId: integer(),
	userId: integer(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	data: text().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_1ced25315eb974b73391fb1c81").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_9c22cb8809630c142d193531a7").using("btree", table.prizeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.prizeId],
			foreignColumns: [prize.id],
			name: "FK_9c22cb8809630c142d193531a77"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_1ced25315eb974b73391fb1c81b"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_ab94760702f01d400c4e845fbe6"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_896e73a28e268aaf00e098b9b89"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_6ecdbdf9aa362f68003aee7be7c"
		}),
]);

export const userSummary = pgTable("user_summary", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	description: varchar({ length: 255 }).default('').notNull(),
	activeChat: integer("active_chat").default(0),
	totalChat: integer("total_chat").default(0),
	resolveChat: integer("resolve_chat").default(0),
	avgRatingChat: integer("avg_rating_chat").default(0),
	totalRatingChat: integer("total_rating_chat").default(0),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	timeOnline: integer("time_online").default(0).notNull(),
	lastOnline: timestamp("last_online", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_aff0b1a68f9e92b9bcf17a095b").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_aff0b1a68f9e92b9bcf17a095b0"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_28d63daa387c7234961a6b7222a"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_117e205b6a0a3073d69a39f86c8"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_19c107aa654d2638579144dcd12"
		}),
]);

export const regions = pgTable("regions", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_950353432e2ecba46e0889fa086"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_7505afd2e32429e9a129fecc9da"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_98105f9af9658c2f8e562ccaba5"
		}),
]);

export const allocationCity = pgTable("allocation_city", {
	id: serial().primaryKey().notNull(),
	regionId: integer(),
	provinceId: integer(),
	name: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_2e3ccbda950d18ed25d9d5877a").using("btree", table.regionId.asc().nullsLast().op("int4_ops")),
	index("IDX_7ee539270776d2552d9c9be60a").using("btree", table.provinceId.asc().nullsLast().op("int4_ops")),
	index("IDX_d09202c8a96759531d81c14182").using("btree", table.status.asc().nullsLast().op("int2_ops")),
	index("IDX_ecf7b2c0eac3128b565b07c258").using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.regionId],
			foreignColumns: [regions.id],
			name: "FK_2e3ccbda950d18ed25d9d5877a3"
		}),
	foreignKey({
			columns: [table.provinceId],
			foreignColumns: [province.id],
			name: "FK_7ee539270776d2552d9c9be60a4"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_873fdb53c50882093c5c6882749"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_177e1e999743d40d7f4fe4221c5"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_e6bebfcc3ebc5e91df0e2b0f760"
		}),
]);

export const province = pgTable("province", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_3288dfa18d390ed33b359fc041").using("btree", table.code.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_48435468b8eac9f23b97f575631"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_883bb14e61f5650a5cad3dc132d"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_72421d85f6fef680b1df8049a47"
		}),
]);

export const city = pgTable("city", {
	id: serial().primaryKey().notNull(),
	provinceId: integer(),
	regionId: integer(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_95959bed787b5e4fd4be4e94fc").using("btree", table.provinceId.asc().nullsLast().op("int4_ops")),
	index("IDX_a702dde63cef536819298d776b").using("btree", table.regionId.asc().nullsLast().op("int4_ops")),
	index("IDX_b94ae715aad0d13e62f585ff11").using("btree", table.code.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.provinceId],
			foreignColumns: [province.id],
			name: "FK_95959bed787b5e4fd4be4e94fc5"
		}),
	foreignKey({
			columns: [table.regionId],
			foreignColumns: [regions.id],
			name: "FK_a702dde63cef536819298d776b5"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_0e5b4733e944fc94c53596eaf95"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_c763694681c8b6033ab3fef5f9f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_bdbee1ecbc8ba8130f72eda28ee"
		}),
]);

export const district = pgTable("district", {
	id: serial().primaryKey().notNull(),
	cityId: integer(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_148f1c944d0fec4114a54984da").using("btree", table.cityId.asc().nullsLast().op("int4_ops")),
	index("IDX_fbfe5cb0d22c2be8c9a9fff5b6").using("btree", table.code.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.cityId],
			foreignColumns: [city.id],
			name: "FK_148f1c944d0fec4114a54984da1"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_72388c1f32646e2f5038cd84e1c"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_1f47433e96335f04b848c2ef21e"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_feb379c654ab624edfbec3143c2"
		}),
]);

export const faq = pgTable("faq", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	type: smallint().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_3821fbcb244017de30363e36043"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_8a407d5d636b2030aeeb1ca92b5"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_f32976e6ae0c8841efbc88d9a87"
		}),
]);

export const forgotPassword = pgTable("forgot_password", {
	id: serial().primaryKey().notNull(),
	otp: varchar({ length: 20 }),
	newPassword: varchar({ length: 100 }).notNull(),
	expired: timestamp({ mode: 'string' }).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_70d1b34d4b1075c0e314813d135"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_983ff493c1709ce64802668b107"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_3c8e90f3d193a477a88ceaab83c"
		}),
]);

export const masterBrand = pgTable("master_brand", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	code: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_8b72b965824384c7ba6e61cdad0"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_e1e095c013aff575629cafd354c"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_b9b142299e3a0e8a340214ad98f"
		}),
]);

export const generalParameter = pgTable("general_parameter", {
	id: serial().primaryKey().notNull(),
	masterBrandId: uuid(),
	name: varchar({ length: 255 }).default('').notNull(),
	description: varchar({ length: 255 }).default('').notNull(),
	value: text().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.masterBrandId],
			foreignColumns: [masterBrand.id],
			name: "FK_28bf59771893208156499880757"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_d323c699d012e5e5d198e3fb7ad"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_320ad15f72da0a0270efc29752c"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_99c8714d3756bc80a9f4e730c5c"
		}),
]);

export const introduction = pgTable("introduction", {
	id: serial().primaryKey().notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	desc: text().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	sort: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_cd7e4c0c7abdafa63dc32904359"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_ee37339672dc68c6bd27e874cf0"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_cee87e60808dfabd5e078d30fcc"
		}),
]);

export const periode = pgTable("periode", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	periodeStart: timestamp("periode_start", { mode: 'string' }).notNull(),
	periodeEnd: timestamp("periode_end", { mode: 'string' }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_3e5fefa4857ff17928f8b186450"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_7a3790b7a54e5e388c20e216fbb"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_37d7571a3a64b401af2c46d4bf2"
		}),
]);

export const prefixPulsa = pgTable("prefix_pulsa", {
	id: serial().primaryKey().notNull(),
	description: varchar({ length: 100 }).default('').notNull(),
	code: varchar({ length: 100 }).default('').notNull(),
	number: varchar({ length: 100 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_c92069d98265c6241d024748a10"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_92cee54958c89da4784d27ef864"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_75ead998718abc880503cb24d52"
		}),
]);

export const tnc = pgTable("tnc", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	type: smallint().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_066eddea8b373256c816bb8989c"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_2b6981049e45004ad4f605fca62"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_37e6ef5b0488f7e9a82e360063a"
		}),
]);

export const transaction = pgTable("transaction", {
	id: serial().primaryKey().notNull(),
	winnerId: integer(),
	status: smallint().default(sql`'0'`).notNull(),
	reason: varchar({ length: 100 }).default('').notNull(),
	resi: varchar({ length: 100 }).default('').notNull(),
	accountNumber: varchar("account_number", { length: 100 }).default('').notNull(),
	reference: varchar({ length: 100 }).default('').notNull(),
	code: varchar({ length: 100 }).default('').notNull(),
	price: varchar({ length: 100 }).default('').notNull(),
	sn: varchar({ length: 100 }).default('').notNull(),
	balance: varchar({ length: 100 }).default('').notNull(),
	trId: varchar("tr_id", { length: 100 }).default('').notNull(),
	rc: varchar({ length: 100 }).default('').notNull(),
	pin: varchar({ length: 100 }).default('').notNull(),
	amount: varchar({ length: 100 }).default('').notNull(),
	message: text(),
	expired: timestamp({ mode: 'string' }),
	proccesedDate: timestamp("proccesed_date", { mode: 'string' }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_cb65eb6a1dc8074016d1b770a7").using("btree", table.winnerId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.winnerId],
			foreignColumns: [winner.id],
			name: "FK_cb65eb6a1dc8074016d1b770a7c"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_d2c2c2e40cf2e32e72bb111f6a0"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_0296ec1d5fe49c069124494378a"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_a6c02973b42994798ae4f305993"
		}),
]);

export const banner = pgTable("banner", {
	id: serial().primaryKey().notNull(),
	urlPicture: varchar("url_picture", { length: 255 }).default('').notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	sort: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	link: varchar({ length: 255 }).default('').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_5ec85e8e3c4f3e6b4c8d54e20a3"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_78c6da82b2ffd6d183de5b0a590"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_700fb08cdcb1b73721086c743a1"
		}),
]);

export const blackList = pgTable("black_list", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	sender: varchar({ length: 255 }).default('').notNull(),
	idNumber: varchar("id_number", { length: 255 }).default('').notNull(),
	ip: varchar({ length: 255 }).default('').notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	type: smallint().default(sql`'1'`).notNull(),
}, (table) => [
	index("IDX_0ad2bf56d6d7e8feba5486af2a").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_8bd4eb22513b1fbf7104ad6359").using("btree", table.sender.asc().nullsLast().op("text_ops")),
	index("IDX_daef1ac21fe10e2f5f8e4e08f4").using("btree", table.type.asc().nullsLast().op("int2_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_0ad2bf56d6d7e8feba5486af2a6"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_aad22c7cf5c726aa1be7ec14472"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_8dececd6e2e4aaf37def0a93d36"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_0f3de817a5b291c0d4db8cd4a02"
		}),
]);

export const news = pgTable("news", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	sort: integer().default(0).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	pictureMobile: varchar("picture_mobile", { length: 255 }).default('').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_622a441863c2e88a857432c8f6e"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_b21055886dc42586e0720a5fc05"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ce37fc8132d7abebba2be9d1663"
		}),
]);

export const winner = pgTable("winner", {
	id: serial().primaryKey().notNull(),
	couponId: integer(),
	allocationId: integer(),
	prizeId: integer(),
	voucherId: integer(),
	userId: integer(),
	masterBrandId: uuid(),
	invalidReasonId: integer(),
	entriesId: integer(),
	status: smallint().default(sql`'0'`).notNull(),
	total: integer().default(1).notNull(),
	isLate: integer("is_late").default(0).notNull(),
	isPush: integer("is_push").default(0).notNull(),
	accountNumber: varchar("account_number", { length: 50 }).notNull(),
	codeTopup: varchar("code_topup", { length: 255 }).notNull(),
	amount: varchar({ length: 255 }).default('0').notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	isApproved: smallint("is_approved").default(sql`'0'`).notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	shippedProcessDate: timestamp("shipped_process_date", { mode: 'string' }),
	shippedDate: timestamp("shipped_date", { mode: 'string' }),
	shippedReceivedDate: timestamp("shipped_received_date", { mode: 'string' }),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	prizeDetailId: integer(),
}, (table) => [
	index("IDX_20116ece29f9de16952a0628f6").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_294ec341c959c839702c3fe979").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("IDX_2e92e32c1955be331cd79fa21f").using("btree", table.prizeId.asc().nullsLast().op("int4_ops")),
	index("IDX_2f7b4b76bff2ce9c28293be921").using("btree", table.entriesId.asc().nullsLast().op("int4_ops")),
	index("IDX_59764df69d6b91a721ea93db4e").using("btree", table.allocationId.asc().nullsLast().op("int4_ops")),
	index("IDX_79361ce19c4fd43310c1bbe28e").using("btree", table.prizeDetailId.asc().nullsLast().op("int4_ops")),
	index("IDX_97a3947d5c6457a8b3c3d90337").using("btree", table.couponId.asc().nullsLast().op("int4_ops")),
	index("IDX_e8de12d343f9efa0a2bb2d1671").using("btree", table.accountNumber.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.allocationId],
			foreignColumns: [allocation.id],
			name: "FK_59764df69d6b91a721ea93db4e4"
		}),
	foreignKey({
			columns: [table.prizeId],
			foreignColumns: [prize.id],
			name: "FK_2e92e32c1955be331cd79fa21f1"
		}),
	foreignKey({
			columns: [table.voucherId],
			foreignColumns: [voucher.id],
			name: "FK_e404bf2475d2ccd65d2c0418944"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_20116ece29f9de16952a0628f6e"
		}),
	foreignKey({
			columns: [table.masterBrandId],
			foreignColumns: [masterBrand.id],
			name: "FK_3b355894f55aac0211f46ca4cdc"
		}),
	foreignKey({
			columns: [table.invalidReasonId],
			foreignColumns: [invalidReason.id],
			name: "FK_67f40fd8df8956fc9c99b120ef8"
		}),
	foreignKey({
			columns: [table.entriesId],
			foreignColumns: [entries.id],
			name: "FK_2f7b4b76bff2ce9c28293be921d"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_e15810b1909f1d1a1b748e85a41"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_da787501d915e78b2fdd1d74673"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_e08ecb5de620226eb6e1b33e794"
		}),
	foreignKey({
			columns: [table.prizeDetailId],
			foreignColumns: [prizeDetail.id],
			name: "FK_79361ce19c4fd43310c1bbe28ea"
		}),
	unique("REL_59764df69d6b91a721ea93db4e").on(table.allocationId),
	unique("REL_2f7b4b76bff2ce9c28293be921").on(table.entriesId),
]);

export const attachment = pgTable("attachment", {
	id: serial().primaryKey().notNull(),
	entriesId: integer(),
	mediaId: integer(),
	userId: integer(),
	url: varchar({ length: 255 }).default('').notNull(),
	type: smallint().default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	sender: varchar({ length: 50 }).default('').notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	winnerId: integer(),
}, (table) => [
	index("IDX_238440067ddc28c1d3dcc7c36f").using("btree", table.winnerId.asc().nullsLast().op("int4_ops")),
	index("IDX_6bf8574e29fde2533a58687d08").using("btree", table.entriesId.asc().nullsLast().op("int4_ops")),
	index("IDX_c32d96ba8b2bab65f5432d19a3").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_c8f8419947417226a3e8124055").using("btree", table.sender.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.entriesId],
			foreignColumns: [entries.id],
			name: "FK_6bf8574e29fde2533a58687d08c"
		}),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "FK_27acd49b8c284e8514041b4d580"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_c32d96ba8b2bab65f5432d19a3c"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_3acbba11947255a83cf2b4ab686"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_d264ce27fc01639f3ed1e6e3512"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_69842ab86d11da6ce419a10328e"
		}),
	foreignKey({
			columns: [table.winnerId],
			foreignColumns: [winner.id],
			name: "FK_238440067ddc28c1d3dcc7c36fa"
		}),
]);

export const version = pgTable("version", {
	id: serial().primaryKey().notNull(),
	platform: varchar({ length: 100 }).default('').notNull(),
	type: varchar({ length: 100 }).default('').notNull(),
	version: integer().default(0).notNull(),
	versionCode: varchar("version_code", { length: 100 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_3f9853d88c2b571ea1dfe4367db"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_10b3c3478e705e5eb5aad4fc840"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_91bd9b9bd7cf0b1aa88477c0bc3"
		}),
]);

export const video = pgTable("video", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	video: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_13d000ea83a238758ffc62f2c94"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_ed8e32689c12459f2000d6a4d25"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_efb6aa37fac589940562ba1fa90"
		}),
]);

export const zipcode = pgTable("zipcode", {
	id: serial().primaryKey().notNull(),
	zipcode: varchar({ length: 10 }).default('').notNull(),
	province: varchar({ length: 100 }).default('').notNull(),
	city: varchar({ length: 100 }).default('').notNull(),
	district: varchar({ length: 100 }).default('').notNull(),
	village: varchar({ length: 100 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_351ac95ed4c119db06ffb6b40df"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_630a5a58b073cd26d372dc1304d"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_49919d45f2743327782d80d14f3"
		}),
]);

export const allocationCategory = pgTable("allocation_category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_f9f09ff47be3430934592a58177"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_5181be25156b5469843da56b93d"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_36aaaab988a17703c0b4bba9283"
		}),
]);

export const allocation = pgTable("allocation", {
	id: serial().primaryKey().notNull(),
	prizeId: integer(),
	categoryId: integer(),
	storeId: integer(),
	regionId: integer(),
	status: integer().default(0).notNull(),
	allocationDate: timestamp("allocation_date", { mode: 'string' }),
	usedDate: timestamp("used_date", { mode: 'string' }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_05e8f1529f02800a5bf66f6764").using("btree", table.regionId.asc().nullsLast().op("int4_ops")),
	index("IDX_1516d8eef44e8d46d4f656b8f4").using("btree", table.allocationDate.asc().nullsLast().op("timestamp_ops")),
	index("IDX_80b273b8e631343f5488d7a3e7").using("btree", table.status.asc().nullsLast().op("int4_ops")),
	index("IDX_80bc0a15f09231a88cac4447e1").using("btree", table.prizeId.asc().nullsLast().op("int4_ops")),
	index("IDX_eb8894bc409a2588a5f043113c").using("btree", table.categoryId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.prizeId],
			foreignColumns: [prize.id],
			name: "FK_80bc0a15f09231a88cac4447e1c"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [allocationCategory.id],
			name: "FK_eb8894bc409a2588a5f043113c1"
		}),
	foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "FK_773455bafb5b47a66fa6ada862e"
		}),
	foreignKey({
			columns: [table.regionId],
			foreignColumns: [regions.id],
			name: "FK_05e8f1529f02800a5bf66f67648"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_889c11883c0d02c2fbbad1a15e3"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_e05d9f22c09a64e4170135027f8"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_22cb451cd421a01bfc7783a5269"
		}),
]);

export const chat = pgTable("chat", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	agentId: integer(),
	conversationId: integer().notNull(),
	sourceId: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 100 }).default('').notNull(),
	phone: varchar({ length: 50 }).default('').notNull(),
	pubsubToken: varchar("pubsub_token", { length: 255 }).notNull(),
	topicId: integer(),
	rating: smallint().default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_52af74c7484586ef4bdfd8e4db").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_791a1e747f7c05a69c2d75e702").using("btree", table.agentId.asc().nullsLast().op("int4_ops")),
	index("IDX_ecab38d17489c34a2e2d14359e").using("btree", table.topicId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_52af74c7484586ef4bdfd8e4dbb"
		}),
	foreignKey({
			columns: [table.agentId],
			foreignColumns: [agent.id],
			name: "FK_791a1e747f7c05a69c2d75e7020"
		}),
	foreignKey({
			columns: [table.topicId],
			foreignColumns: [topic.id],
			name: "FK_ecab38d17489c34a2e2d14359ea"
		}),
]);

export const agent = pgTable("agent", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const topic = pgTable("topic", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	type: smallint().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_59d7548ea797208240417106e2d"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_732d9b46569498299c81cf2123f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_57d0e097548da1fb4b7fb6c1fd4"
		}),
]);

export const surveyType = pgTable("survey_type", {
	id: serial().primaryKey().notNull(),
	description: varchar({ length: 255 }).default('').notNull(),
	start: timestamp({ mode: 'string' }),
	end: timestamp({ mode: 'string' }),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_fe1da252df2dccf25a8efa9ebd9"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_d704b383088b211b31ca4cb0fbc"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_584008a278c7c509ce886e829cb"
		}),
]);

export const surveyQuestionType = pgTable("survey_question_type", {
	id: serial().primaryKey().notNull(),
	description: varchar({ length: 255 }).default('').notNull(),
	type: varchar({ length: 100 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_27590f95a80eb087bbafa84fbcc"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_f916212ba78e98334dbc060e939"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_3f14eb530918a48d168fe81548f"
		}),
]);

export const surveyQuestion = pgTable("survey_question", {
	id: serial().primaryKey().notNull(),
	surveyTypeId: integer(),
	surveyQuestionTypeId: integer(),
	sort: smallint().default(sql`'0'`).notNull(),
	no: varchar().default('').notNull(),
	header: integer().default(0).notNull(),
	description: text().default('').notNull(),
	max: smallint().default(sql`'0'`).notNull(),
	min: smallint().default(sql`'0'`).notNull(),
	required: smallint().default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.surveyTypeId],
			foreignColumns: [surveyType.id],
			name: "FK_95090e74cb623e383501729a853"
		}),
	foreignKey({
			columns: [table.surveyQuestionTypeId],
			foreignColumns: [surveyQuestionType.id],
			name: "FK_f2433162fd26a7ab8d9e29cfd89"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_f786eb83497a9988c422eca8cf1"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_f95325a18bc8c87acbc5a37bffa"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_97e4eec3c6c7751d4363e057c56"
		}),
]);

export const surveyQuestionDet = pgTable("survey_question_det", {
	id: serial().primaryKey().notNull(),
	surveyQuestionId: integer(),
	description: text().default('').notNull(),
	value: varchar({ length: 100 }).default('').notNull(),
	sort: smallint().default(sql`'0'`).notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.surveyQuestionId],
			foreignColumns: [surveyQuestion.id],
			name: "FK_99de913d3789f85c0ac91a99629"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_4ef7de98fe7d29baf6ad192058c"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_86c7061987997af52947022db81"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_56ddd3b0db348f9fb2033b3bbb1"
		}),
]);

export const surveyAnswer = pgTable("survey_answer", {
	id: serial().primaryKey().notNull(),
	userMobileId: integer(),
	surveyTypeId: integer(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userMobileId],
			foreignColumns: [userMobile.id],
			name: "FK_48b256148a7d64257943ccf2b71"
		}),
	foreignKey({
			columns: [table.surveyTypeId],
			foreignColumns: [surveyType.id],
			name: "FK_7a4e9ddaee4eab922e60eed2f72"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_6833c7446fc479b65de3bf49493"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_a5a55222a93ec7602e84ffe0b04"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_96aa8d09cf6b629d499206a3546"
		}),
]);

export const surveyAnswerDet = pgTable("survey_answer_det", {
	id: serial().primaryKey().notNull(),
	surveyAnswerId: integer(),
	surveyQuestionDetId: integer(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.surveyAnswerId],
			foreignColumns: [surveyAnswer.id],
			name: "FK_6bb396b9a0ee2bd8e5c389115e3"
		}),
	foreignKey({
			columns: [table.surveyQuestionDetId],
			foreignColumns: [surveyQuestionDet.id],
			name: "FK_1cef93ab272d4d28417ea365423"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_899d9404008f578d91a72dfd1d6"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_55141d55bb8fc1c6da69df3dae1"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_48f9dfbc22e91d1aa402284d359"
		}),
]);

export const summaryProfileMonthly = pgTable("summary_profile_monthly", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_0ae377b10116e94a125e842a58").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_13ca1502e0f172425e7468f3b74"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_7cba1de6c0ff9d7e8c99d3d70c5"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_eb6776bba51f1b5351a51604ae2"
		}),
]);

export const summaryProfileWeekly = pgTable("summary_profile_weekly", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_5e6ccbbff9ad4dd1f6cae826d3").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_863b83a40d6fa6f81a49ef54a1b"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_88d4d089b9c390d0d5c6ef438a8"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_1f42ca6bb6b127e61139ac70d14"
		}),
]);

export const summaryProfileDaily = pgTable("summary_profile_daily", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_3d8bc435f0da906176090db96a").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_b36942bb01394c9f3cbfa0d0597"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_ecee9d2d4f965ece30a29f62d43"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_3cfc8a0383a9bc9083dc3806cf2"
		}),
]);

export const summaryMode = pgTable("summary_mode", {
	id: serial().primaryKey().notNull(),
	summaryName: varchar("summary_name", { length: 50 }),
	summaryCellKey: varchar("summary_cell_key", { length: 50 }),
	summaryKey: varchar("summary_key", { length: 50 }),
	graph: varchar({ length: 50 }),
	graphName: varchar("graph_name", { length: 50 }),
	media: integer(),
	prjType: varchar({ length: 50 }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_d0c1e887fec3e93675fd067dbce"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_45547ad2b0cf63ddfb0a75a7552"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_b85a29fe8ded53bb9da1d1c3901"
		}),
]);

export const summaryEntriesWeekly = pgTable("summary_entries_weekly", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	unluckWa: integer("unluck_wa").default(0).notNull(),
	unluckApp: integer("unluck_app").default(0).notNull(),
	unluckMcr: integer("unluck_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	unluck: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_da59542cfef647a33326bb650b").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_6ede2393e37d9f9bedb82475058"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_5d265c8504ee615ef377024ae54"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ec445cd18641d632d725ed008a4"
		}),
]);

export const summaryEntriesMonthly = pgTable("summary_entries_monthly", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	unluckWa: integer("unluck_wa").default(0).notNull(),
	unluckApp: integer("unluck_app").default(0).notNull(),
	unluckMcr: integer("unluck_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	unluck: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_afd2aa299d04545a7ad5ce9f58").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_7c1b46499c1b22002ad3d20d0a5"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_e083817202e4dfdbfef988e5a9f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_e09cb45d45ed626dc61cd5f695e"
		}),
]);

export const summaryEntriesDaily = pgTable("summary_entries_daily", {
	id: serial().primaryKey().notNull(),
	label: varchar({ length: 100 }),
	validWa: integer("valid_wa").default(0).notNull(),
	validApp: integer("valid_app").default(0).notNull(),
	validMcr: integer("valid_mcr").default(0).notNull(),
	unluckWa: integer("unluck_wa").default(0).notNull(),
	unluckApp: integer("unluck_app").default(0).notNull(),
	unluckMcr: integer("unluck_mcr").default(0).notNull(),
	invalidWa: integer("invalid_wa").default(0).notNull(),
	invalidApp: integer("invalid_app").default(0).notNull(),
	invalidMcr: integer("invalid_mcr").default(0).notNull(),
	pendingWa: integer("pending_wa").default(0).notNull(),
	pendingApp: integer("pending_app").default(0).notNull(),
	pendingMcr: integer("pending_mcr").default(0).notNull(),
	pending: integer().default(0).notNull(),
	valid: integer().default(0).notNull(),
	unluck: integer().default(0).notNull(),
	invalid: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_f704d3ff97162d5eaee41dc877").using("btree", table.label.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_2483d7c7e648368c89375ac74b8"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_a9dfeebb6965141e295db099b73"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ef8b59dfe94b0de63d073d497d8"
		}),
]);

export const masterCouponType = pgTable("master_coupon_type", {
	id: serial().primaryKey().notNull(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_368f9d7efae649df3331361e71c"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_13151774a6c6780d53884ff5d06"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_9ecaa9ed6c5e74b5735a73cffd6"
		}),
]);

export const masterCouponVariant = pgTable("master_coupon_variant", {
	id: serial().primaryKey().notNull(),
	masterCouponTypeId: integer(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_36afafb26e7786f777f42245e7").using("btree", table.masterCouponTypeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.masterCouponTypeId],
			foreignColumns: [masterCouponType.id],
			name: "FK_36afafb26e7786f777f42245e79"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_f60d06b86625b8de0c7ecbd6e6f"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_f781ee784549be43f4105ec1db8"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_0cb99572a679642515ad3a454c8"
		}),
]);

export const masterCouponCharacter = pgTable("master_coupon_character", {
	id: serial().primaryKey().notNull(),
	masterCouponVariantId: integer(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_856cddb4b0ae071fc84c21d8dc").using("btree", table.masterCouponVariantId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.masterCouponVariantId],
			foreignColumns: [masterCouponVariant.id],
			name: "FK_856cddb4b0ae071fc84c21d8dc1"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_bde16f8ed082432b2c3af8e28b2"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_95c5fcfbdde01e01e666f966630"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_5ad7ee2e35cf0b087b2f6c80afc"
		}),
]);

export const couponType = pgTable("coupon_type", {
	id: serial().primaryKey().notNull(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_e505392c0cfae59aad1cc9d50bb"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_0c5a3e0966d92f44002ac0dcb04"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_17b4a458686d948f408ac6e7648"
		}),
]);

export const couponVariant = pgTable("coupon_variant", {
	id: serial().primaryKey().notNull(),
	couponTypeId: integer(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_0610d89e056b06c428eb94d794").using("btree", table.couponTypeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.couponTypeId],
			foreignColumns: [couponType.id],
			name: "FK_0610d89e056b06c428eb94d794d"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_6292f67a37c6d54fd58187746ff"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_a7398198a687513a12a03aee99b"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_e9ae88fd11982e54bec8d594d9d"
		}),
]);

export const couponVariantCharacter = pgTable("coupon_variant_character", {
	id: serial().primaryKey().notNull(),
	couponVariantId: integer(),
	description: varchar().default('').notNull(),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	type: integer().default(0).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_a8433d0b16735c1cb4459aaeb7").using("btree", table.couponVariantId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.couponVariantId],
			foreignColumns: [couponVariant.id],
			name: "FK_a8433d0b16735c1cb4459aaeb78"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_4ded1ae553fd4af1faac7aeeeaf"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_3c4c388cd010823c8b78ecc890e"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_7bece64603862944fe67d515c2a"
		}),
]);

export const prize = pgTable("prize", {
	id: serial().primaryKey().notNull(),
	voucherId: integer(),
	typeId: integer(),
	name: varchar({ length: 255 }).default('').notNull(),
	nameSub: varchar("name_sub", { length: 255 }).default('').notNull(),
	status: smallint().notNull(),
	picture: varchar({ length: 255 }).default('').notNull(),
	textUrl: varchar({ length: 255 }).default('').notNull(),
	amount: varchar({ length: 255 }).default('').notNull(),
	codes: varchar({ length: 255 }).default('').notNull(),
	prizeReply: text("prize_reply").notNull(),
	historyDesc: text("history_desc").notNull(),
	quantity: integer().default(0).notNull(),
	topupType: smallint().default(sql`'0'`).notNull(),
	sort: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	isTopup: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	categoryId: integer(),
	uuid: uuid().default(sql`uuid_generate_v4()`).notNull(),
	variantId: integer(),
	discountPoint: integer("discount_point").default(0).notNull(),
	isExist: smallint().default(sql`'0'`).notNull(),
	startDiscountTime: timestamp({ mode: 'string' }),
	endDiscountTime: timestamp({ mode: 'string' }),
}, (table) => [
	index("IDX_d182c6cb27a880050beaa00c58").using("btree", table.uuid.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [prizeCategory.id],
			name: "FK_cb7d45eef2d8be1651ad0597e67"
		}),
	foreignKey({
			columns: [table.voucherId],
			foreignColumns: [voucher.id],
			name: "FK_aeed649304103c2a4c3c6e912ad"
		}),
	foreignKey({
			columns: [table.typeId],
			foreignColumns: [prizeType.id],
			name: "FK_9d12a727d287bf93a072b6f439c"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_029800d595e4ebd623f661b3bee"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_05a52ac73afed9bf705fd6ff19c"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_9ad1f29958b94e7f7b666436cbd"
		}),
	foreignKey({
			columns: [table.variantId],
			foreignColumns: [prizeVariant.id],
			name: "FK_24c30f3fe139d072bf9a60e7249"
		}),
	unique("UQ_d182c6cb27a880050beaa00c587").on(table.uuid),
]);

export const masterGuide = pgTable("master_guide", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	type: smallint().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	sort: smallint().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_4d8b8df165f075ea90540184cb3"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_9498b869dd2a04d7411e228961a"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_d3fa4eb2776b4ec50e126cb6443"
		}),
]);

export const prizeVariant = pgTable("prize_variant", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_9bb91ab077311f23fdf6479706b"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_f0d8d6c7fc72d0adfa3e719ba6a"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_ab88e02fd48ab392e34f3594666"
		}),
]);

export const tSpecialPoint = pgTable("t_special_point", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	point: integer().default(0),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	userSpecialId: integer(),
}, (table) => [
	index("IDX_0ed78c2f75b85df3f2ca820a62").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_0ed78c2f75b85df3f2ca820a62f"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_7e81479a65e5690a910c0abc8c6"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_816d8e0d0550d56f78ce210d852"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_6fe37dbe3658767be5c68d9d5f6"
		}),
	foreignKey({
			columns: [table.userSpecialId],
			foreignColumns: [mSpecialPoint.id],
			name: "FK_16359b10b1bdef716f94fb97060"
		}),
]);

export const transactionLimitation = pgTable("transaction_limitation", {
	id: serial().primaryKey().notNull(),
	uuid: uuid().default(sql`uuid_generate_v4()`).notNull(),
	userId: integer(),
	description: varchar({ length: 255 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	rcvdTime: timestamp("rcvd_time", { mode: 'string' }),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }).defaultNow(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("IDX_2791404b52ebf04d15d1d30b58").using("btree", table.uuid.asc().nullsLast().op("uuid_ops")),
	index("IDX_5296ac644c4b902c0911d15183").using("btree", table.rcvdTime.asc().nullsLast().op("timestamp_ops")),
	index("IDX_9de634d2359ec1baf95274b854").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_9de634d2359ec1baf95274b854f"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_46113552de679dcaaf1529248a0"
		}),
]);

export const mSpecialPoint = pgTable("m_special_point", {
	name: varchar({ length: 100 }),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	id: serial().primaryKey().notNull(),
	description: varchar({ length: 100 }),
	point: integer().default(0),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_64408dd6f1cb4d7e16c881b05af"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_d460e052d8407bca2ae4e788b61"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_342b27619408c94253097334763"
		}),
]);

export const masterSlider = pgTable("master_slider", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).default('').notNull(),
	content: text().notNull(),
	link: text().notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	sort: smallint().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_eaa2740ad237bb8bbfb78135b42"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_386320592ae3a33a4b4be5b5208"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_b4e99fe84d781e21191fc889e60"
		}),
]);

export const history = pgTable("history", {
	id: serial().primaryKey().notNull(),
	userId: integer(),
	userRankPeriodeId: integer(),
	point: integer().default(0).notNull(),
	winnerId: integer(),
	entriesId: integer(),
	type: integer().default(0).notNull(),
	desc: text().notNull(),
	coupon: varchar({ length: 100 }).default('').notNull(),
	status: smallint().default(sql`'1'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	sn: varchar({ length: 100 }).default('').notNull(),
	expired: timestamp({ mode: 'string' }),
}, (table) => [
	index("IDX_483af5bc31bf77db991570f963").using("btree", table.userRankPeriodeId.asc().nullsLast().op("int4_ops")),
	index("IDX_7d339708f0fa8446e3c4128dea").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	index("IDX_8781165a457a78b3e6aaae8d4b").using("btree", table.type.asc().nullsLast().op("int4_ops")),
	index("IDX_8c0cb2bcbaeae3c2648be6c908").using("btree", table.winnerId.asc().nullsLast().op("int4_ops")),
	index("IDX_b0547d7dbcef2b1f8f626425ce").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	index("IDX_c63c3144f7f754b33d15828803").using("btree", table.entriesId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "FK_7d339708f0fa8446e3c4128dea9"
		}),
	foreignKey({
			columns: [table.userRankPeriodeId],
			foreignColumns: [userRankPeriode.id],
			name: "FK_483af5bc31bf77db991570f9636"
		}),
	foreignKey({
			columns: [table.winnerId],
			foreignColumns: [winner.id],
			name: "FK_8c0cb2bcbaeae3c2648be6c9084"
		}),
	foreignKey({
			columns: [table.entriesId],
			foreignColumns: [entries.id],
			name: "FK_c63c3144f7f754b33d158288039"
		}),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [userMobile.id],
			name: "FK_0cf7829e3135b1f16b7ecd877d2"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [userMobile.id],
			name: "FK_c3eb9163d2a4a19f8215eab1f64"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [userMobile.id],
			name: "FK_8345747ae6c9cfbf897e4916eea"
		}),
]);

export const prizeDetail = pgTable("prize_detail", {
	id: serial().primaryKey().notNull(),
	description: varchar().default('').notNull(),
	startTime: timestamp("start_time", { mode: 'string' }),
	endTime: timestamp("end_time", { mode: 'string' }),
	quantity: integer().default(0).notNull(),
	point: integer().default(0).notNull(),
	status: smallint().default(sql`'0'`).notNull(),
	isDeleted: smallint("is_deleted").default(sql`'0'`).notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	createdById: integer(),
	updatedById: integer(),
	deletedById: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	prizeId: integer(),
	uuid: uuid().default(sql`uuid_generate_v4()`).notNull(),
}, (table) => [
	index("IDX_1b64dd0aa7609a46e42d25e5a8").using("btree", table.prizeId.asc().nullsLast().op("int4_ops")),
	index("IDX_be8f1dcd3e50b9b857acc250ea").using("btree", table.uuid.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.createdById],
			foreignColumns: [users.id],
			name: "FK_769faa7ea62d5b8cd5955c0b602"
		}),
	foreignKey({
			columns: [table.updatedById],
			foreignColumns: [users.id],
			name: "FK_d1593acda3247b4b7349e191744"
		}),
	foreignKey({
			columns: [table.deletedById],
			foreignColumns: [users.id],
			name: "FK_baae5955fee7734b2df44ec898f"
		}),
	foreignKey({
			columns: [table.prizeId],
			foreignColumns: [prize.id],
			name: "FK_1b64dd0aa7609a46e42d25e5a83"
		}),
	unique("UQ_be8f1dcd3e50b9b857acc250eab").on(table.uuid),
]);