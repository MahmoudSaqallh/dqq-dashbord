export interface WarehousePriorityRow {
  id: string;
  warehouseName: string;
  active: boolean;
}

export const WAREHOUSE_PRIORITY_ROWS: WarehousePriorityRow[] = [
  { id: "layer-1", warehouseName: "مخزن دقق", active: true },
  { id: "layer-2", warehouseName: "مخزن دقق 2", active: true },
  { id: "layer-3", warehouseName: "مخزن دقق 3", active: true },
  { id: "layer-4", warehouseName: "الفرع الرئيسي", active: true },
  { id: "layer-5", warehouseName: "الفرع الرئيسي", active: true },
  { id: "layer-6", warehouseName: "الفرع الرئيسي", active: true },
];
