class DefaultHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.META['Content-Type'] = 'application/json'
        request.META['Connection'] = 'keep-alive'
        response = self.get_response(request)
        # Add your custom headers to the response
        # Code to be executed for each request/response after
        return response
