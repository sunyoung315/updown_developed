self.addEventListener('fetch', event => {
  // 카카오 로그인 요청은 서비스 워커에서 처리하지 않음
  if (event.request.url.includes('/oauth2/authorization/kakao')) {
    return; // 요청을 가로채지 않고 그냥 지나감
  }

  // 기본 fetch 요청 처리
  event.respondWith(
    fetch(event.request).catch(() => {
      // 요청 실패하면 캐시에서 해당 요청을 찾아 반환
      return caches.match(event.request);
    }),
  );
});
