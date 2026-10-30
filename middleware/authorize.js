export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const tokenUserId = Number(req.user?.id);
  const targetUserId = Number(req.params.userId);

  // Parents may modify any watchlist. Children may only modify their own.
  const isParent = role === "parent";
  const isOwnChild = role === "child" && targetUserId === tokenUserId;

  if (!isParent && !isOwnChild) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}