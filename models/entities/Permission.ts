// Defines the possible actions for a permission
interface PermissionActions {
  view: boolean
  create: boolean
  update: boolean
  delete: boolean
}

// Defines the structure for a single permission node (e.g., "node")
interface PermissionNode {
  [nodeName: string]: Partial<PermissionActions> // Allows for dynamic node names like "node", "user", "document" etc.
  // Partial<PermissionActions> makes all actions optional within a node
}

// Defines the overall permissions structure
export interface Permissions {
  permissions: PermissionNode
}
