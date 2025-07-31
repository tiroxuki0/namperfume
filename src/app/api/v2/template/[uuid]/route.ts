import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    data: {
      uuid: "3627e5c5-cf37-4f78-988e-ff41086bac18",
      name: "Sample name",
      type: {
        uuid: "49617202-3c01-4c0f-ac75-65b014b2bb68",
        name: "mec",
        display_name: "Sample display name"
      },
      management_type: "managed",
      vault_account_count: 29,
      markup: null,
      created_at: "2024-05-28T08:15:20.000Z",
      updated_at: "2025-04-17T07:13:29.000Z",
      deleted_at: null,
      is_deleted: false,
      category: "service",
      resource_group: null
    }
  })
}
