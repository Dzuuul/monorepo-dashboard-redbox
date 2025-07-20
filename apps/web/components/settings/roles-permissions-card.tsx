import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Shield,
  Pencil,
  Trash2,
  Plus,
  User,
  Users,
  Settings,
  Edit as EditIcon,
  Eye,
  Star,
  Key,
  Lock,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// Tipe data role dan permission
export type Permission = string;
// Tambahkan tipe icon
export type RoleIcon = keyof typeof ICONS_MAP;
export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
  icon?: RoleIcon;
};

// Map icon lucide
const ICONS_MAP = {
  Shield,
  User,
  Users,
  Settings,
  Edit: EditIcon,
  Eye,
  Star,
  Key,
  Lock,
};
const ICON_OPTIONS: { label: string; value: RoleIcon }[] = [
  { label: "Shield", value: "Shield" },
  { label: "User", value: "User" },
  { label: "Users", value: "Users" },
  { label: "Settings", value: "Settings" },
  { label: "Edit", value: "Edit" },
  { label: "Eye", value: "Eye" },
  { label: "Star", value: "Star" },
  { label: "Key", value: "Key" },
  { label: "Lock", value: "Lock" },
];

interface RolesPermissionsCardProps {
  roles: Role[];
  permissions: Permission[];
  onChange: (roles: Role[]) => void;
  onApply?: () => void;
  onRevert?: () => void;
  isChanged?: boolean;
}

export const RolesPermissionsCard: React.FC<RolesPermissionsCardProps> = ({
  roles,
  permissions,
  onChange,
  onApply,
  onRevert,
  isChanged,
}) => {
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState<Permission[]>(
    []
  );
  const [newRoleIcon, setNewRoleIcon] = useState<RoleIcon>("Shield");
  const [editRoleName, setEditRoleName] = useState("");
  const [editRolePermissions, setEditRolePermissions] = useState<Permission[]>(
    []
  );
  const [editRoleIcon, setEditRoleIcon] = useState<RoleIcon>("Shield");

  // Tambah role baru
  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    const newRole: Role = {
      id: Date.now().toString(),
      name: newRoleName.trim(),
      permissions: newRolePermissions,
      icon: newRoleIcon,
    };
    onChange([...roles, newRole]);
    setNewRoleName("");
    setNewRolePermissions([]);
    setNewRoleIcon("Shield");
  };

  // Edit role
  const handleEditRole = (role: Role) => {
    setEditingRoleId(role.id);
    setEditRoleName(role.name);
    setEditRolePermissions(role.permissions);
    setEditRoleIcon(role.icon || "Shield");
  };

  const handleSaveEditRole = () => {
    if (!editRoleName.trim() || !editingRoleId) return;
    onChange(
      roles.map((role) =>
        role.id === editingRoleId
          ? {
              ...role,
              name: editRoleName.trim(),
              permissions: editRolePermissions,
              icon: editRoleIcon,
            }
          : role
      )
    );
    setEditingRoleId(null);
    setEditRoleName("");
    setEditRolePermissions([]);
    setEditRoleIcon("Shield");
  };

  // Hapus role
  const handleDeleteRole = (id: string) => {
    onChange(roles.filter((role) => role.id !== id));
  };

  // Toggle permission (untuk add/edit)
  const togglePermission = (perm: Permission, isEdit: boolean) => {
    if (isEdit) {
      setEditRolePermissions((prev) =>
        prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
      );
    } else {
      setNewRolePermissions((prev) =>
        prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Roles & Permissions
        </CardTitle>
        <CardDescription>Atur hak akses per role dalam sistem.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Form tambah role - compact */}
        <form
          className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 p-2 bg-muted/50 rounded-lg border"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRole();
          }}
        >
          {/* Pilih icon */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                {React.createElement(ICONS_MAP[newRoleIcon], {
                  className: "w-4 h-4",
                })}
                <span className="hidden sm:inline">Pilih Icon</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-2">
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`flex flex-col items-center gap-1 p-2 rounded hover:bg-muted border ${
                      newRoleIcon === opt.value ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setNewRoleIcon(opt.value)}
                  >
                    {React.createElement(ICONS_MAP[opt.value], {
                      className: "w-5 h-5",
                    })}
                    <span className="text-xs">{opt.label}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* Input nama role */}
          <Input
            id="new-role-name"
            placeholder="Nama role baru"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            className="w-full sm:w-48"
            autoComplete="off"
            aria-label="Nama Role"
          />
          {/* Pilih permissions */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Pilih Permissions
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-2">
              <div className="flex flex-col gap-1">
                {permissions.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 text-xs cursor-pointer"
                  >
                    <Checkbox
                      checked={newRolePermissions.includes(perm)}
                      onCheckedChange={() => togglePermission(perm, false)}
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button
            type="submit"
            size="sm"
            variant="default"
            className="gap-1 px-3"
            disabled={!newRoleName.trim()}
            aria-label="Tambah Role"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </form>

        {/* Daftar role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = ICONS_MAP[role.icon || "Shield"];
            return (
              <div
                key={role.id}
                className="space-y-3 border rounded-lg p-4 bg-background shadow-sm flex flex-col justify-between min-h-[180px]"
              >
                {editingRoleId === role.id ? (
                  <>
                    <div className="flex flex-col gap-2 mb-2">
                      {/* Pilih icon saat edit */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto flex items-center gap-2"
                          >
                            {React.createElement(ICONS_MAP[editRoleIcon], {
                              className: "w-4 h-4",
                            })}
                            <span className="hidden sm:inline">Pilih Icon</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-56 p-2">
                          <div className="grid grid-cols-4 gap-2">
                            {ICON_OPTIONS.map((opt) => (
                              <button
                                type="button"
                                key={opt.value}
                                className={`flex flex-col items-center gap-1 p-2 rounded hover:bg-muted border ${
                                  editRoleIcon === opt.value
                                    ? "ring-2 ring-primary"
                                    : ""
                                }`}
                                onClick={() => setEditRoleIcon(opt.value)}
                              >
                                {React.createElement(ICONS_MAP[opt.value], {
                                  className: "w-5 h-5",
                                })}
                                <span className="text-xs">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Input
                        value={editRoleName}
                        onChange={(e) => setEditRoleName(e.target.value)}
                        className="mb-1"
                      />
                      <div className="flex flex-wrap gap-2">
                        {permissions.map((perm) => (
                          <label
                            key={perm}
                            className="flex items-center gap-1 text-xs"
                          >
                            <Checkbox
                              checked={editRolePermissions.includes(perm)}
                              onCheckedChange={() =>
                                togglePermission(perm, true)
                              }
                            />
                            {perm}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={handleSaveEditRole}
                      >
                        Simpan
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingRoleId(null)}
                      >
                        Batal
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-base max-w-[60%]">
                          {role.name}
                        </h4>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditRole(role)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {role.permissions.length === 0 ? (
                        <Badge variant="outline">No Permissions</Badge>
                      ) : (
                        role.permissions.map((perm) => (
                          <Badge key={perm} variant="outline">
                            {perm}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Tombol Apply & Revert jika props diberikan */}
        {(onApply || onRevert) && (
          <div className="flex gap-2 justify-end mt-4">
            {onRevert && (
              <Button
                size="sm"
                variant="outline"
                onClick={onRevert}
                disabled={!isChanged}
              >
                Revert
              </Button>
            )}
            {onApply && (
              <Button
                size="sm"
                variant="default"
                onClick={onApply}
                disabled={!isChanged}
              >
                Apply
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
