/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
  let l1 = root1;
  let l2 = root2;
  if(l1 === null) return l2;
  if(l2 === null) return l1;
  let merged = new TreeNode(l1.val + l2.val);
  merged.left = mergeTrees(l1.left, l2.left);
  merged.right = mergeTrees(l1.right, l2.right);
  return merged;
};
console.log(mergeTrees([1,3,2,5], [2,1,3,null,4,null,7]));
