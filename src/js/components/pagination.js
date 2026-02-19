export function setupPagination(button, isFetchingRef, onLoadMore) {
    if (!button) return;

    button.addEventListener("click", () => {
        if (isFetchingRef()) return;
        onLoadMore();
    });
}