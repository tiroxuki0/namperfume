# SelectResource Component

`SelectResource` là một component mở rộng từ `antd` Select, được thiết kế để hỗ trợ gọi dữ liệu động từ API kèm theo tính năng tìm kiếm có debounce, tối ưu hóa UI UX cho dropdown list và giữ cho phần hiển thị label sau khi chọn đơn giản, rõ ràng. Component này đặc biệt hữu ích trong các hệ thống CMS hoặc Dashboard Admin có quy mô dữ liệu lớn và thường xuyên tương tác với API.

## Mục đích sử dụng

- Dùng để render dropdown các lựa chọn có nguồn từ server.
- Hỗ trợ search động (debounce) để tối ưu số lần gọi API.
- Có thể tùy chỉnh giao diện dropdown mà vẫn giữ phần label hiển thị rõ ràng.

---

## Tính năng nổi bật

- ✅ Gọi API tự động khi focus hoặc khi có input search.
- ✅ Hỗ trợ fallback option (giá trị mặc định hoặc đã chọn từ trước).
- ✅ Tuỳ biến UI option bằng prop `optionRender`.
- ✅ Không làm rối UI khi đã chọn: chỉ hiển thị label từ `labelField`.
- ✅ Dễ dàng tái sử dụng với cấu hình props tối giản.

---

## Cách sử dụng

### 1. Import component

```tsx
import SelectResource from '@/components/SelectResource'
```

### 2. Ví dụ cơ bản

```tsx
<SelectResource
  resourceApiPath="/admin/users"
  labelField="full_name"
  valueField="id"
  shouldFetch={true}
  placeholder="Chọn người dùng"
/>
```

### 3. Tuỳ biến dropdown hiển thị

```tsx
<SelectResource
  resourceApiPath="/admin/users"
  labelField="full_name"
  valueField="id"
  shouldFetch={true}
  optionRender={(record) => (
    <div>
      <strong>{record.full_name}</strong>
      <div style={{ fontSize: 12, color: '#999' }}>{record.email}</div>
    </div>
  )}
/>
```

> ⚠️ `optionRender` chỉ dùng để render trong danh sách dropdown. Khi user chọn, UI vẫn chỉ hiển thị giá trị của `labelField`.

---

## Props chi tiết

| Tên prop          | Kiểu dữ liệu                         | Mặc định   | Mô tả                                            |
| ----------------- | ------------------------------------ | ---------- | ------------------------------------------------ |
| `resourceApiPath` | `string`                             | Bắt buộc   | API endpoint để gọi danh sách                    |
| `labelField`      | `string`                             |            | Field dùng làm nhãn hiển thị sau khi chọn        |
| `valueField`      | `string`                             |            | Field dùng làm giá trị trả về của option         |
| `shouldFetch`     | `boolean`                            | `false`    | Cho phép hoặc không cho phép gọi API             |
| `responseObject`  | `string`                             | `'data'`   | Đường dẫn đến danh sách data trong response      |
| `fallbackOptions` | `{ value: string, label: string }[]` | `[]`       | Danh sách option fallback hoặc đã chọn trước đó  |
| `needTranslate`   | `boolean`                            | `false`    | Có dịch giá trị `labelField` bằng i18n hay không |
| `searchParamKey`  | `string`                             | `'search'` | Tên param gửi khi gọi API search                 |
| `delay`           | `number`                             | `500`      | Thời gian debounce search (ms)                   |
| `showSearch`      | `boolean`                            | `true`     | Có bật tìm kiếm hay không                        |
| `extraParams`     | `Record<string, any>`                | `{}`       | Tham số phụ gửi kèm API                          |
| `optionRender`    | `(record: any) => React.ReactNode`   |            | Hàm custom render UI dropdown option             |
| `filterOption`    | `boolean`                            | `true`     | Dùng lọc client-side hay không                   |

---

## Ghi chú kỹ thuật

- `useDebounceCallback`: hook debounce được custom để kiểm soát số lần gọi API khi search.
- `useQuery` từ `@tanstack/react-query` được sử dụng để caching, retry và quản lý trạng thái API call.
- Hỗ trợ fallback options để đảm bảo các giá trị đã chọn không bị mất khi component re-render hoặc API chưa trả về.
- `optionRender` được gán vào `customNode` và chỉ dùng trong `optionRender` của Antd để đảm bảo UI consistent.

---

## Best practices

- Luôn truyền `labelField` và `valueField` đúng với API để component hoạt động chính xác.
- Không lạm dụng `optionRender` để hiển thị thông tin dài dòng trong dropdown.
- Với dữ liệu lớn, nên dùng `filterOption={false}` để bật chế độ server-side search.

---

## Đóng góp & bảo trì

Component này thuộc về hệ thống nội bộ. Nếu cần mở rộng, nên giữ các props hiện tại rõ ràng và dễ dùng, tránh over-config.

> ✨ Maintained by: Frontend Team
