import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    data: [
      {
        uuid: "3627e5c5-cf37-4f78-988e-ff41086bac18",
        name: "Template Provider",
        type: {
          uuid: "49617202-3c01-4c0f-ac75-65b014b2bb68",
          name: "mec",
          display_name: "MEC",
          logo: "https://pm-object-storage-v2-dev.fusionflow.cloud:8080/v2-dev-pm-tenants/y8ueb0s414b9y2kdsa1lrxwiazf3?response-content-disposition=inline%3B%20filename%3D%22privatcloud.png%22%3B%20filename%2A%3DUTF-8%27%27privatcloud.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=8SSJUPQX6XFRLOTASMYL%2F20250123%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250123T092414Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=f9ec5a913c871c9ae8f7274e75c8b5bf17832b4c027f0886dec75a8145b941fa"
        },
        management_type: "managed",
        image_url:
          "https://pm-object-storage-v2-dev.fusionflow.cloud:8080/v2-dev-pm-tenants/y8ueb0s414b9y2kdsa1lrxwiazf3?response-content-disposition=inline%3B%20filename%3D%22privatcloud.png%22%3B%20filename%2A%3DUTF-8%27%27privatcloud.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=8SSJUPQX6XFRLOTASMYL%2F20250511%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250511T060358Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9925e8e9ed768a3fd4f81d73a1305fc09f9186a638af11532f51a944e7de423a",
        vault_account_count: 29,
        markup: null,
        created_at: "2024-05-28T08:15:20.000Z",
        updated_at: "2025-04-17T07:13:29.000Z",
        deleted_at: null,
        is_deleted: false
      }
    ],
    meta: {
      page: "1",
      per_page: 30,
      next_page: null,
      prev_page: null,
      total_pages: 1,
      total: 23
    }
  })
}

export async function POST() {
  return NextResponse.json({
    status: 200,
    message: "Create successfully"
  })
}
