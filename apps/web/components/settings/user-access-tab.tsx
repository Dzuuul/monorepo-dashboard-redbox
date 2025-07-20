"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Users,
  Activity,
  Plus,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import {
  RolesPermissionsCard,
  Role,
  Permission,
} from "./roles-permissions-card";
import { useUnsavedRoleChanges } from "../../lib/store/unsaved-role-changes";
import { useEffect } from "react";

interface User {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive";
  lastLogin?: string;
}

export function UserAccessTab() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      role: "Admin",
      status: "active",
      lastLogin: "2 minutes ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Editor",
      status: "active",
      lastLogin: "10 minutes ago",
    },
    {
      id: "3",
      name: "Bob Wilson",
      role: "Viewer",
      status: "inactive",
      lastLogin: "2 days ago",
    },
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    status: "active",
  });

  // State untuk roles & permissions
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      permissions: ["Full Access", "User Management", "System Settings"],
      icon: "Shield",
    },
    {
      id: "2",
      name: "Editor",
      permissions: ["Content Access", "Limited Settings"],
      icon: "Edit",
    },
    {
      id: "3",
      name: "Viewer",
      permissions: ["Read Only", "Dashboard View"],
      icon: "Eye",
    },
  ]);
  const [rolesDraft, setRolesDraft] = useState<Role[]>(roles);
  const [permissions] = useState<Permission[]>([
    "Full Access",
    "User Management",
    "System Settings",
    "Content Access",
    "Limited Settings",
    "Read Only",
    "Dashboard View",
  ]);

  // Cek apakah ada perubahan
  const isChanged = JSON.stringify(roles) !== JSON.stringify(rolesDraft);

  // Global unsaved changes store
  const setUnsavedRoleChanges = useUnsavedRoleChanges((s) => s.setUnsaved);
  const resetUnsavedRoleChanges = useUnsavedRoleChanges((s) => s.reset);

  useEffect(() => {
    if (isChanged) {
      setUnsavedRoleChanges(true);
    } else {
      resetUnsavedRoleChanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged]);

  // Apply perubahan
  const handleApplyRoles = () => {
    setRoles(rolesDraft);
  };

  // Revert perubahan
  const handleRevertRoles = () => {
    setRolesDraft(roles);
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.role) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        role: newUser.role,
        status: newUser.status as "active" | "inactive",
        lastLogin: "Just now",
      };

      setUsers([...users, user]);
      setNewUser({ name: "", role: "", status: "active" });
      setIsAddUserOpen(false);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
      setIsEditUserOpen(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "secondary";
      case "Editor":
        return "outline";
      case "Viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <UserCheck className="h-4 w-4 text-primary" />
    ) : (
      <UserX className="h-4 w-4 text-muted-foreground" />
    );
  };

  return (
    <div className="grid gap-6 grid-full-wrapper">
      {/* User Accounts */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Accounts
          </CardTitle>
          <CardDescription>
            Kelola user, tambah/edit/hapus user dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Total Users</h4>
              <p className="text-sm text-muted-foreground">
                {users.length} active users
              </p>
            </div>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Tambahkan user baru ke dalam sistem. Semua field wajib
                    diisi.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newUser.status}
                      onValueChange={(value) =>
                        setNewUser({
                          ...newUser,
                          status: value as "active" | "inactive",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddUserOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddUser}
                    disabled={!newUser.name || !newUser.role}
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Edit User Dialog */}
          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Edit informasi user. Semua field wajib diisi.
                </DialogDescription>
              </DialogHeader>
              {editingUser && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select
                      value={editingUser.role}
                      onValueChange={(value) =>
                        setEditingUser({ ...editingUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingUser.status}
                      onValueChange={(value) =>
                        setEditingUser({
                          ...editingUser,
                          status: value as "active" | "inactive",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditUserOpen(false);
                    setEditingUser(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateUser}
                  disabled={!editingUser?.name || !editingUser?.role}
                >
                  Update User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="grid gap-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(user.status)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <RolesPermissionsCard
        roles={rolesDraft}
        permissions={permissions}
        onChange={setRolesDraft}
        onApply={handleApplyRoles}
        onRevert={handleRevertRoles}
        isChanged={isChanged}
      />

      {/* Login Activity / Audit Log */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Login Activity / Audit Log
          </CardTitle>
          <CardDescription>
            Lihat histori login dan aktivitas penting dalam sistem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Login successful
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.lastLogin}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing last 50 activities
            </p>
            <Button variant="outline" size="sm">
              View All Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
