
เรื่องแก้ local caches

1. 1 version 1db 1store
- ให้ฟีคเวอร์ชั่นไปที่ 1 เลย
- class รับแค่ชื่อ constructor(name){}
- ลบ handle error ออกเพราะเหลือแค่1version
2. prefix+name
-
class localStroage(name) {
  set(prefix+name+key,value)
}
3. ทำ async await ให้คลีนกว่านี้
- เอา ready ออกจาก local-cache ไปใส่ไว้ใน CacheIndexedDBStorage แทน



