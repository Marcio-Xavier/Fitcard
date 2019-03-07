namespace TesteFitcard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Category",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    description = c.String(nullable: false, maxLength: 100),
                })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.State",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    name = c.String(nullable: false, maxLength: 100),
                    fu = c.String(nullable: false, maxLength: 2),
                })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.City",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    name = c.String(nullable: false, maxLength: 100),
                    stateID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.State", t => t.stateID, cascadeDelete: false)
                .Index(t => t.stateID);

            CreateTable(
                "dbo.Company",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    companyName = c.String(nullable: false, maxLength: 150),
                    tradingName = c.String(maxLength: 150),
                    cnpj = c.String(nullable: false, maxLength: 18),
                    email = c.String(maxLength: 320),
                    address = c.String(maxLength: 150),
                    neighborhood = c.String(maxLength: 150),
                    complement = c.String(maxLength: 150),
                    number = c.String(maxLength: 15),
                    stateID = c.Int(nullable: false),
                    cityID = c.Int(nullable: false),
                    telephone = c.String(maxLength: 14),
                    registrationDate = c.DateTime(nullable: true),
                    categoryID = c.Int(nullable: false),
                    status = c.Boolean(nullable: false),
                    bankAgency = c.String(maxLength: 5),
                    bankAccount = c.String(maxLength: 8),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Category", t => t.categoryID, cascadeDelete: false)
                .ForeignKey("dbo.City", t => t.cityID, cascadeDelete: false)
                .ForeignKey("dbo.State", t => t.stateID, cascadeDelete: false)
                .Index(t => t.cnpj, unique: true)
                .Index(t => t.stateID)
                .Index(t => t.cityID)
                .Index(t => t.categoryID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Company", "stateID", "dbo.State");
            DropForeignKey("dbo.City", "stateID", "dbo.State");
            DropForeignKey("dbo.Company", "cityID", "dbo.City");
            DropForeignKey("dbo.Company", "categoryID", "dbo.Category");
            DropIndex("dbo.City", new[] { "stateID" });
            DropIndex("dbo.Company", new[] { "categoryID" });
            DropIndex("dbo.Company", new[] { "cityID" });
            DropIndex("dbo.Company", new[] { "stateID" });
            DropIndex("dbo.Company", new[] { "cnpj" });
            DropTable("dbo.State");
            DropTable("dbo.City");
            DropTable("dbo.Company");
            DropTable("dbo.Category");
        }
    }
}
