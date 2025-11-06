const ScreenshotDemo = () => {
  return (
    <section className="container mx-auto px-4 py-12" id="screenshot-demo">
      <h2 className="text-xl font-semibold mb-4">Local Screenshot Preview</h2>
      <div className="bg-card p-4 rounded-lg border border-border">
        {/* Place your file at public/screenshot.png to show here */}
        <img src="/screenshot.png" alt="User screenshot" className="w-full rounded shadow" />
      </div>
      <p className="text-sm text-muted-foreground mt-2">If you don't see an image, copy your screenshot into the project's <code>public/</code> folder as <code>screenshot.png</code>.</p>
    </section>
  );
};

export default ScreenshotDemo;
