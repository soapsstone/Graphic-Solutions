USE [Graphic-Solutions];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Customer');
set identity_insert [UserType] off

set identity_insert [User] on
insert into [User] (Id, FirebaseUserId, firstName, LastName, Email, Password, UserTypeId) values (1,'9mGaCYwhd0M92IpAgumDBPROwV22', 'Foo', 'Bar', 'admin@admin.com', 'Peanutbutter' , 1);
insert into [User] (Id, FirebaseUserId, firstName, LastName, Email, Password, UserTypeId) values (2,'JuSBM2ST3NVRDvA1VeQCtqCtVXx1', 'Emmaline', 'Cornfoot', 'customer@customer.com', 'Peanutbutter', 2);
set identity_insert [User] off