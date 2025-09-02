import { db } from "./drizzle";
import { media, access, userMobile, accessDet } from "./schema";

async function seed() {
  try {
    // Seed data media
    await db.insert(media).values([
      { name: "PO BOX", status: 0, code: 100 },
      { name: "SMS", status: 0, code: 200 },
      { name: "WA", status: 0, code: 300 },
      { name: "WEB", status: 1, code: 400 },
      { name: "APPS", status: 0, code: 500 },
      { name: "DROP BOX", status: 0, code: 600 },
      { name: "EMAIL", status: 0, code: 700 },
      { name: "TELEGRAM", status: 0, code: 800 },
    ]);

    // Seed data access roles
    await db.insert(access).values([
      { id: 1, description: "Root", status: 1 },
      { id: 2, description: "Administrator", status: 1 },
    ]);

    // Seed data users
    await db.insert(userMobile).values([
      {
        accessId: 1,
        username: "marcelljoe",
        fullname: "Marcellino Jonathan",
        password:
          "$2a$12$YkNDCd1NBgjTk/4meg5FO.UPEhyyMtzZ4AcS1pR6JBdPG.Di2jqWq",
        status: 1,
      },
      {
        accessId: 2,
        username: "brody",
        fullname: "Brody",
        password:
          "$2a$12$YkNDCd1NBgjTk/4meg5FO.UPEhyyMtzZ4AcS1pR6JBdPG.Di2jqWq",
        status: 1,
      },
    ]);

  const accessMenus: Record<number, number[]> = {
    1: [1, 2, 3, 4],
    2: [4, 5, 6],
    // tambahkan accessId lain sesuai kebutuhan
  };

  const values = Object.entries(accessMenus).flatMap(([accessId, menuIds]) =>
    menuIds.map((menuId) => ({
      accessId: Number(accessId),
      menuId,
      mInsert: 1,
      mUpdate: 1,
      mApprove: 0,
      mDelete: 1,
      mView: 1,
      sort: 0,
      isDeleted: 0,
      deletedAt: null,
      createdById: null,
      updatedById: null,
      deletedById: null,
      createdAt: "2023-05-11 13:58:44.476025",
      updatedAt: "2023-05-11 13:58:44.476025",
    }))
  );

  await db.insert(accessDet).values(values);


    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seed();
