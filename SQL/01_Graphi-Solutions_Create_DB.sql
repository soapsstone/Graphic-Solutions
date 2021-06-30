USE [master]

IF db_id('Graphic-Solutions') IS NULl
  CREATE DATABASE [Graphic-Solutions]
GO

USE [Graphic-Solutions]
GO


DROP TABLE IF EXISTS [Orders];
DROP TABLE IF EXISTS [OrderDetails];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [Orders] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [title] varchar(100) NOT NULL,
  [userId] int NOT NULL
)
GO

CREATE TABLE [OrderDetails] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [orderId] int NOT NULL,
  [quantity] varchar(100) NOT NULL,
  [color] varchar(100) NOT NULL,
  [style] varchar(100) NOT NULL,
  [size] varchar(100) NOT NULL,

  CONSTRAINT [FK_OrderDetails_Orders] FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([Id])
)
GO

CREATE TABLE [User] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [firstName] nvarchar(50) NOT NULL,
  [lastName] nvarchar(50) NOT NULL,
  [email] nvarchar(550) NOT NULL,
  [password] nvarchar(50) NOT NULL,
  [userTypeId] int NOT NULL,

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [UserType] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(50) NOT NULL
)
GO

ALTER TABLE [Orders] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([id])
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([id])
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([id])
GO