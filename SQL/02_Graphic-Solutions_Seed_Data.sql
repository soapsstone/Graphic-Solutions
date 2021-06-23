USE [Graphic-Solutions];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Customer');
set identity_insert [UserType] off