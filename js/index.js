// http://gitgraphjs.com/

var myTemplateConfig = {
  colors: ["#f44336", "#3f51b5", "#795548", "#009688", "#ffc107", "#ff5722"],
  branch: {
    lineWidth: 3,
    spacingX: 30,
    labelRotation: 0,
    showLabel: true
  },
  commit: {
    spacingY: 40,
    dot: {
      size: 10
    },
    message: {
      displayAuthor: false,
      displayBranch: true,
      displayHash: false,
      font: "normal 14pt Arial"
    }
  }

};
var myTemplate = new GitGraph.Template(myTemplateConfig);

var graph = new GitGraph({
  template: "metro", // or blackarrow
  orientation: "vertical",
  elementId: 'graph',
  mode: "extended", // or compact if you don't want the messages  
  template: myTemplate
});

var featureCol = 0;
var developCol = 1;
var releaseCol = 2;
var supportCol = 3;
var masterCol = 4;

// Branchs
var master = graph.branch({name: "master", column: masterCol});
master.commit("Init Repo");

var dev = graph.branch({ parentBranch: master, name: "develop", column: developCol});
dev.commit("Start Project");

var feature1 = graph.branch({ parentBranch: dev, name: "feature/NewFeatureA", column: featureCol});
feature1.commit("Implementation new feature!");
feature1.merge(dev);

var release = graph.branch({parentBranch: dev, name: "Release", column: releaseCol});

var feature2 = graph.branch({parentBranch: dev, name: "feature/NewFeatureB", column: featureCol});
feature2.commit("Implementation new feature!");

release.commit("Update Version Code");
release.merge(master, {tag: "v1.0.0"});
release.merge(dev);
release.checkout();

feature2.merge(dev);

var hotfix = graph.branch({ parentBranch: master, name: "hotfix/superBug", column: supportCol});
hotfix.commit("Fix Super Bug");

var featureDead = graph.branch({parentBranch: dev, name: "feature/notAccept", column: featureCol});
featureDead.commit("Not Accept this commit now");

hotfix.merge(master);
hotfix.merge(dev);

var feature3 = graph.branch({parentBranch: dev, name: "feature/NewFeatureC", column: featureCol});
feature3.commit("New Super Feature");
feature3.merge(dev);