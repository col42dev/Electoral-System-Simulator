# Election Simulator

Web application for simululating elections using various electorial systems. It shows how the main voting systems work and how a set of votes generate different results depending on which system is being used.

## Systems

### Standard Transferable Vote.

This is a form of proportional voting which is typically used for elections where there are multiple seats to be allocated. In the simulator you setup the conditions for the election - the number of candidates, the number of seats up for election and the number of votes to be cast. The simulator will randomly generate the set of votes based of these inputs, then it processes and displays each of the voting resolution rounds which STV uses to determine the elected candidates. At each resolution round candidates may be eliminated or elected, it ends once the required number of candidates have been elected.

References:

[Single transferable vote](https://en.wikipedia.org/wiki/Single_transferable_vote)

[Meek Rule](http://prfound.org/resources/reference/reference-meek-rule/)

[Counting single transferable votes](https://en.wikipedia.org/wiki/Counting_single_transferable_votes)	

[Meekster](https://github.com/oneclickorgs/meekster)

[Droop](https://code.google.com/p/droop/)

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

### Build & development

Run `grunt` for building and `grunt serve` for preview.

### Testing

Running `grunt test` will run the unit tests with karma.

### Blog Posting 
[blog posting](http://col42dev.github.io/ElectionSimulator/)

## Hosted Application
[Election Simulator](http://ec2-54-201-237-107.us-west-2.compute.amazonaws.com/stv/#/elect)


