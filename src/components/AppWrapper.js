import React, { useEffect } from "react";

// AppWrapper chỉ cần lắng nghe sự kiện visibilitychange
function AppWrapper({ children, onVisibilityChange }) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Khi trang chuyển từ background lên foreground
        const urlParams = new URLSearchParams(window.location.search);
        const forceReload = urlParams.get("force_reload");

        // Nếu cần làm mới dữ liệu
        if (forceReload === "true" && onVisibilityChange) {
          onVisibilityChange();  // Gọi hàm làm mới dữ liệu từ component cha
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onVisibilityChange]);

  return <>{children}</>;
}

export default AppWrapper;
