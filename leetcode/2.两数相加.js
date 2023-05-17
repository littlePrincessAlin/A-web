/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  // 设计一个空链表,最终要返回list.next
  const list = new ListNode();
  // 空链表的指针
  let cur = list;
  // 记录：加法进位
  let carry = 0;
  while (l1 !== null || l2 !== null) {
    const x = l1 === null ? 0 : l1.val;
    const y = l2 === null ? 0 : l2.val;
    const sum = x + y + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    if(l1 !== null) {
      l1 = l1.next;
    }
    if(l2 !== null) {
      l2 = l2.next;
    }
  }
  if(carry) {
    cur.next = new ListNode(carry);
  }
  return list.next;
};
